window.veda = window.veda || {};
window.veda.plugins = window.veda.plugins || {};
window.veda.utils = window.veda.utils || {};
window.veda.init = function () {
  window.veda.utils.isMobile = {
    android: navigator.userAgent.match(/Android/i),
    blackBerry: navigator.userAgent.match(/BlackBerry/i),
    ipad: navigator.userAgent.match(/iPad/i),
    iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i),
    opera: navigator.userAgent.match(/Opera Mini/i),
    windows: navigator.userAgent.match(/Windows Phone/i),
    amazonePhone: navigator.userAgent.match(
      /(?:SD4930UR|\\bSilk(?:.+)Mobile\\b)/i
    ),
    amazoneTablet: navigator.userAgent.match(/Silk/i),
    any: navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Windows Phone|(?:SD4930UR|\bSilk(?:.+)Mobile\b)|Silk/i
    ),
  };

  window.veda.utils.objectParse = function (value) {
    const fn = new Function(`return ${value.trim()}`);
    return fn();
  };

  window.veda.utils.getColorNames = function () {
    // prettier-ignore
    return ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
  };

  window.veda.utils.storage = (function () {
    let checked = false;
    const storageAvailable = () => {
      if (!checked) {
        checked = true;
        const item = "@localStorageCheck";
        try {
          window.localStorage.setItem(item, item);
          window.localStorage.removeItem(item);
          return true;
        } catch {
          return false;
        }
      }
    };
    const createStorage = () => {
      if (storageAvailable()) {
        return window.localStorage;
      } else {
        return {
          getItem() {
            return null;
          },
          setItem() {},
          removeItem() {},
          clear() {},
          key() {
            return null;
          },
          length: 0,
        };
      }
    };

    const storage = createStorage();
    return storage;
  })();


  class VedaStore { // Observer Pattern
    constructor(options = {}) {
      this.store = {};
      this.listeners = {};
      this.storageRegisters = {}; // subcribe
      this.options = {
        logger: options.logger || false,
      };
      this.storage = veda.utils.storage;
    }

    static logger(prevStore, nextStore) {
      return (name) => {
        console.group(`%c VedaStore: ${name}`, "color: #614eff");
        console.log(
          "%c Prev Store ",
          "color: #999; font-weight: 600",
          prevStore
        );
        console.log(
          "%c Next Store ",
          "color: #7ac143; font-weight: 600",
          nextStore
        );
        console.groupEnd();
      };
    }

    _handleListeners(stateName) {
      if (!!this.listeners[stateName]) {
        this.listeners[stateName].forEach((listener) => {
          listener(this.store[stateName]);
        });
      }
    }

    _getState(stateName, initialState) {
      const stateStr = this.storage.getItem(stateName);
      if (stateStr !== undefined && this.storageRegisters[stateName]) {
        return JSON.parse(this.storage.getItem(stateName));
      }
      return initialState;
    }

    _setStorage(stateName, state) {
      if (
        !!stateName &&
        state !== undefined &&
        this.storageRegisters[stateName]
      ) {
        const stateStr = JSON.stringify(state);
        this.storage.setItem(stateName, stateStr);
      }
    }

    _set(stateName, nextState) {
      const { logger } = this.options;
      const prevStore = { ...this.store };
      this.store[stateName] = nextState;
      this._setStorage(stateName, nextState);
      this._handleListeners(stateName);
      if (logger) {
        return VedaStore.logger(prevStore, this.store);
      }
    }

    get(stateName) {
      if (stateName) {
        return this.store[stateName];
      }
      return this.store;
    }

    create(stateName, { initialState, useStorage = false }) {
      if (!this.store[stateName]) {
        this.storageRegisters[stateName] = useStorage;
        this.store[stateName] = this._getState(stateName, initialState);
        if (!this._getState(stateName, initialState)) {
          this._setStorage(stateName, initialState);
        }
        if (!useStorage) {
          this.storage.removeItem(stateName);
        }
        this._handleListeners(stateName);
      }
    }

    set(stateName, state) {
      if (typeof state === "function") {
        const prevState = this.store[stateName];
        return this._set(stateName, state(prevState));
      }
      return this._set(stateName, state);
    }
  //  store.subscribe("CompareVisible", this.init.bind(this));
    subscribe(stateName, listener) {
      this.listeners[stateName] = this.listeners[stateName] || [];
      this.listeners[stateName].push(listener);

      return () => {
        this.listeners[stateName] = this.listeners[stateName].filter(
          (listen) => listen !== listener
        );
      };
    }
  }

  window.veda.utils.store = new VedaStore({
    logger: builderMode || false,
  });

  window.veda.utils.map = function (array, callback) {
    return array.map(callback).join("");
  };

  class AnimateScroll {
    constructor() {
      this.observer = null;
      this.timeoutId = -1;
      this.init();
      this.checkForBuilder();
    }

    handler(entries) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          const el = entry.target;
          const animateClasses = el.getAttribute("data-veda-animate");
          el.classList.add(...animateClasses.trim().split(" "));
        }
      });
    }

    checkForBuilder() {
      if (window.BUILDER) {
        window.addEventListener("message", (event) => {
          if (event?.data?.type === "@animate") {
            if (this.observer) {
              this.observer.disconnect();
            }
            this.timeoutId = setTimeout(() => {
              this.init();
            }, 1000);
          }
        });
      }
    }

    init() {
      const els = document.querySelectorAll("[data-veda-animate]");
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };
      clearTimeout(this.timeoutId);
      this.observer = new IntersectionObserver(this.handler, options);
      els.forEach((el) => {
        const animateClasses = el.getAttribute("data-veda-animate");
        if (animateClasses.includes("animate__animated-scroll")) {
          this.observer.observe(el);
        } else {
          el.classList.add(...animateClasses.trim().split(" "));
        }
      });
    }
  }
  if (document.getElementById("_______veda-preview_______")) {
    const timeoutId = setTimeout(() => {
      new AnimateScroll();
      clearTimeout(timeoutId);
    }, 0);
  } else {
    new AnimateScroll();
  }
  // Plugins

  class CoreCountdown {
    constructor(el) {
      this.el = el;
      this.deadline = Number(
        veda.utils.objectParse(el.getAttribute("data-options")).timestamp
      );
      this.daysEl = el.querySelector(".core-countdown__days");
      this.hoursEl = el.querySelector(".core-countdown__hours");
      this.minutesEl = el.querySelector(".core-countdown__minutes");
      this.secondsEl = el.querySelector(".core-countdown__seconds");
      this.intervalId = -1;
      this.oneSecond = 1000;
      this.mount();
      this.init();
    }

    mount() {
      this.daysEl.innerText = "";
      this.hoursEl.innerText = "";
      this.minutesEl.innerText = "";
      this.secondsEl.innerText = "";
    }

    getDays(distance) {
      return Math.floor(distance / (1000 * 60 * 60 * 24));
    }

    getHours(distance) {
      return Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }

    getMinutes(distance) {
      return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    }

    getSeconds(distance) {
      return Math.floor((distance % (1000 * 60)) / 1000);
    }

    handleCountdown() {
      const distance = this.deadline - Date.now();
      if (distance > 0) {
        const days = this.getDays(distance);
        const hours = this.getHours(distance);
        const minutes = this.getMinutes(distance);
        const seconds = this.getSeconds(distance);
        if (Number(this.daysEl.innerText) !== days) {
          this.daysEl.innerText = days;
        }
        if (Number(this.hoursEl.innerText) !== hours) {
          this.hoursEl.innerText = hours;
        }
        if (Number(this.minutesEl.innerText) !== minutes) {
          this.minutesEl.innerText = minutes;
        }
        if (Number(this.secondsEl.innerText) !== minutes) {
          this.secondsEl.innerText = seconds;
        }
      } else {
        clearInterval(this.intervalId);
      }
    }

    init() {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(
        this.handleCountdown.bind(this),
        this.oneSecond
      );
    }
  }

  window.veda.plugins.countdown = function (containerEl) {
    const els = containerEl.querySelectorAll(".core-countdown");
    els.forEach((el) => {
      new CoreCountdown(el);
    });
  };

  class CoreImageZoom {
    constructor(el) {
      this.el = el;
      this.imgEl = this.el.querySelector("img");
      this.zoom = this.el.getAttribute("data-image-zoom") || 3;
      this.imageZoomItemEl = this.createZoomItemEl();
      this.init();
    }

    createZoomItemEl() {
      const el = document.createElement("div");
      el.src = this.srcZoom;
      el.className = "core-image-zoom__zoom-item";
      this.el.appendChild(el);
      return el;
    }

    handleMouseMove(event) {
      const { offsetX, offsetY } = event;
      const { offsetWidth, offsetHeight } = event.currentTarget;
      const x =
        Math.min(Math.max((offsetX / offsetWidth) * 100, 0), 100) *
        (this.zoom - 1) *
        -1;
      const y =
        Math.min(Math.max((offsetY / offsetHeight) * 100, 0), 100) *
        (this.zoom - 1) *
        -1;
      const srcZoom =
        this.el.getAttribute("data-image-zoom-src") || this.imgEl.src;
      this.el.classList.add("core-image-zoom--active");
      this.imageZoomItemEl.style.backgroundImage = `url('${srcZoom}')`;
      this.imageZoomItemEl.style.transform = `scale(${this.zoom})`;
      this.imageZoomItemEl.style.top = `${y}%`;
      this.imageZoomItemEl.style.left = `${x}%`;
    }

    handleMouseLeave() {
      this.el.classList.remove("core-image-zoom--active");
    }

    init() {
      if (!window.veda.utils.isMobile.any) {
        this.el.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.el.addEventListener(
          "mouseleave",
          this.handleMouseLeave.bind(this)
        );
      }
    }
  }

  window.veda.plugins.imageZoom = function (containerEl) {
    const els = containerEl.querySelectorAll(".core-image-zoom");
    els.forEach((el) => {
      new CoreImageZoom(el);
    });
  };

  class CoreSwiper {
    constructor(containerEl) {
      this.els = containerEl.querySelectorAll(".core-swiper");
      this.init();
    }

    handleSwiper(el) {
      const defaultOptions = {
        pagination: {
          el: ".core-swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".core-swiper-button-next",
          prevEl: ".core-swiper-button-prev",
        },
        spaceBetween: 30,
      };
      try {
        const options = veda.utils.objectParse(el.getAttribute("data-options"));
        const swiper = new Swiper(el, { ...defaultOptions, ...options });
        swiper.update();
      } catch {
        const swiper = new Swiper(el, defaultOptions);
        swiper.update();
      }
      this.handleThumbSwiper(el.nextElementSibling);
    }

    handleThumbSwiper(thumbEl) {
      if (
        thumbEl &&
        thumbEl.className === "core-swiper-thumbnails" &&
        thumbEl.length > 0
      ) {
        const wrapperThumbs = thumbEl.querySelector(".swiper-wrapper");
        const options = veda.utils.objectParse(
          thumbEl.getAttribute("data-options")
        );
        const defaultOptions = {
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 3,
          touchRatio: 0.3,
          slideToClickedSlide: true,
          pagination: {
            el: ".core-swiper-pagination",
          },
          navigation: {
            nextEl: ".core-swiper-button-next",
            prevEl: ".core-swiper-button-prev",
          },
        };
        var thumbSwiper = new Swiper(thumbEl, {
          ...defaultOptions,
          ...options,
        });
        swiper.controller.control = thumbSwiper;
        thumbSwiper.controller.control = swiper;
      }
    }

    init() {
      this.els.forEach(this.handleSwiper.bind(this));
    }
  }

  window.veda.plugins.swiper = function (containerEl) {
    new CoreSwiper(containerEl);
  };

  class CoreTabs {
    constructor(el) {
      this.el = el;
      this.linkEls = Array.from(el.querySelectorAll(".core-tabs__link"));
      this.paneEls = Array.from(el.querySelectorAll(".core-tabs__pane"));
      this.index =
        this.linkEls.findIndex((el) =>
          el.className.includes("core-tabs__link--active")
        ) || 0;
      this.init();
    }

    handlePanel() {
      this.paneEls.forEach((paneEl) => {
        paneEl?.classList.remove("core-tabs__pane--active");
      });
      this.paneEls[this.index]?.classList.add("core-tabs__pane--active");
    }

    handleTabLink(linkEl, index) {
      linkEl.addEventListener("click", (event) => {
        event.preventDefault();
        this.index = index;
        this.linkEls.forEach((linkEl) => {
          linkEl?.classList.remove("core-tabs__link--active");
        });
        event.currentTarget?.classList.add("core-tabs__link--active");
        this.handlePanel();
      });
    }

    init() {
      this.handlePanel();
      this.linkEls.forEach(this.handleTabLink.bind(this));
    }
  }

  window.veda.plugins.tabs = function (containerEl) {
    const tabEls = containerEl.querySelectorAll(".core-tabs");
    tabEls.forEach((tabEl) => {
      new CoreTabs(tabEl);
    });
  };

  window.veda.plugins.themeToggle = function (containerEl) {
    const htmlEl = document.querySelector("html");
    const btnEls = containerEl.querySelectorAll(".core-toggle-theme");
    const coreTheme = localStorage.getItem("@coreTheme") ?? "light";
    const isDark = coreTheme === "dark";
    if (isDark) {
      htmlEl.classList.add("dark");
    }
    const handleClick = (event) => {
      event.preventDefault();
      htmlEl.classList.toggle("dark");
      const coreTheme = localStorage.getItem("@coreTheme") ?? "light";
      const isDark = coreTheme === "dark";
      if (isDark) {
        localStorage.setItem("@coreTheme", "light");
      } else {
        localStorage.setItem("@coreTheme", "dark");
      }
      btnEls.forEach((btnEl) => {
        if (isDark) {
          btnEl.classList.remove("core-toggle-theme--dark");
        } else {
          btnEl.classList.add("core-toggle-theme--dark");
        }
      });
    };

    btnEls.forEach((btnEl) => {
      if (isDark) {
        btnEl.classList.add("core-toggle-theme--dark");
      }
      btnEl.removeEventListener("click", handleClick);
      btnEl.addEventListener("click", handleClick);
    });
  };

  window.veda.plugins.mobileMenu = function (
    containerEl,
    {
      width = 300,
      duration = 200,
      navSelector = ".core-nav",
      menuSelector = ".core-nav__menu",
      linkSelector = ".core-nav__link",
      subMenuSelector = ".core-nav__sub-list",
      backClassName = "core-nav__list-item-back",
      closeClassName = "core-nav__list-item-close",
      hamburgerButtonPosition = "afterbegin",
      renderHamburgerButton = (className) =>
        `<div class="${className} core-hamburger-menu-icon"><i class="fal fa-bars"></i></div>`,
      renderBackButton = (className) =>
        `<div class="${className} core-nav-back-button"><i class="far fa-arrow-left"></i></div>`,
      renderCloseButton = (className) =>
        `<div class="${className} core-nav-close-button"><i class="fal fa-times"></i></div>`,
    }
  ) {
    /** @type {HTMLElement} */
    const navEl = containerEl.querySelector(navSelector);
    /** @type {HTMLUListElement} */
    const menuEl = navEl.querySelector(menuSelector);
    /** @type {NodeListOf<HTMLLIElement>} */
    const anchorEls = menuEl.querySelectorAll(linkSelector);
    /** @type {NodeListOf<HTMLLIElement>} */
    const submenuEls = menuEl.querySelectorAll(subMenuSelector);
    const hamburgerClassName = "core-nav__hamburger";
    const closeBtnClassName = "core-nav__close";
    const hamburgerButtonHtml = renderHamburgerButton(hamburgerClassName);
    const closeButtonHtml = renderCloseButton(closeBtnClassName);
    const initialized = false;
    let isActive = false;
    const navMobileClassName = "core-nav--mobile";
    const boxShadow = "10px 0 30px 0 rgba(0, 0, 0, 0.1)";
    const transition = `transform ${duration}ms, box-shadow ${duration}ms`;

    function handleNavigation() {
      navEl.insertAdjacentHTML(hamburgerButtonPosition, hamburgerButtonHtml);
    }

    function handleMenu() {
      menuEl.style.width = `${width}px`;
      menuEl.style.left = `-${width}px`;
      menuEl.style.transition = transition;
      const liEl = document.createElement("li");
      liEl.style.textAlign = "right";
      liEl.className = closeClassName;
      liEl.insertAdjacentHTML("afterbegin", closeButtonHtml);
      menuEl.insertAdjacentElement("afterbegin", liEl);
      const closeButtonEl = menuEl.querySelector(`.${closeBtnClassName}`);
      closeButtonEl.addEventListener("click", toggleMenu);
    }

    function toggleMenu() {
      isActive = !isActive;
      menuEl.style.transform = isActive ? "translateX(100%)" : "translateX(0)";
      menuEl.style.boxShadow = isActive ? boxShadow : "none";
    }

    function handleHamburgerButton() {
      const hamburgerBtnEl = navEl.querySelector(`.${hamburgerClassName}`);
      hamburgerBtnEl.addEventListener("click", toggleMenu);
    }

    /**
     *
     * @param {MouseEvent} event
     */
    function handleAnchorElClick(event) {
      /** @type {HTMLAnchorElement}  */
      const currentAnchorEl = event.currentTarget;
      const submenuEl = currentAnchorEl.nextElementSibling;
      if (!!submenuEl) {
        event.preventDefault();
        submenuEls.forEach((submenuEl) => {
          submenuEl.style.overflowY = "hidden";
          submenuEl.scrollTo({ top: 0 });
        });
        menuEl.style.overflowY = "hidden";
        menuEl.scrollTo({ top: 0 });
        submenuEl.style.transform = "translateX(100%)";
        submenuEl.style.overflowY = "auto";
        submenuEl.style.boxShadow = boxShadow;
      }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    function handleBackButtonClick(event) {
      event.preventDefault();
      /** @type {HTMLElement}  */
      const currentBackButtonEl = event.currentTarget;
      const submenuEl = currentBackButtonEl.parentNode.parentNode;
      const submenuParentEl =
        currentBackButtonEl.parentNode.parentNode.parentNode.parentNode;
      submenuEl.style.transform = "translateX(0)";
      submenuEl.style.overflowY = "hidden";
      submenuEl.style.boxShadow = "none";
      submenuEl.scrollTo({ top: 0 });
      submenuParentEl.style.overflowY = "auto";
    }

    /**
     *
     * @param {HTMLAnchorElement} anchorEl
     */
    function handleAnchorEl(anchorEl) {
      anchorEl.addEventListener("click", handleAnchorElClick);
      const submenuEl = anchorEl.nextElementSibling;
      const listEl = document.createElement("li");
      listEl.className = `${backClassName} core-nav__list-item-back`;
      const backButtonHtml = renderBackButton("core-nav__back");
      listEl.innerHTML = backButtonHtml;
      if (!!submenuEl) {
        anchorEl.insertAdjacentHTML(
          "beforeend",
          '<i class="far fa-angle-right core-nav__icon-right"></i>'
        );
        submenuEl.style.left = `-${width}px`;
        submenuEl.style.transition = transition;
        submenuEl.insertAdjacentElement("afterbegin", listEl);
        const backButtonEl = submenuEl.children[0].children[0];
        backButtonEl.addEventListener("click", handleBackButtonClick);
      }
    }

    function handleClickOutside() {
      window.addEventListener("click", (event) => {
        const hamburgerBtnEl = navEl.querySelector(`.${hamburgerClassName}`);
        if (
          !menuEl.contains(event.target) &&
          !hamburgerBtnEl.contains(event.target)
        ) {
          if (isActive) {
            toggleMenu();
          }
        }
      });
    }

    function removeProperty(el) {
      el.style.removeProperty("width");
      el.style.removeProperty("left");
      el.style.removeProperty("transform");
      el.style.removeProperty("transition");
      el.style.removeProperty("overflow-y");
      el.style.removeProperty("boxShadow");
    }

    function handleDestroy() {
      const liBackEls = menuEl.querySelectorAll(".core-nav__list-item-back");
      const iconRightEls = menuEl.querySelectorAll(".core-nav__icon-right");
      const hamburgerBtnEl = navEl.querySelector(`.${hamburgerClassName}`);
      const closeBtnEl = menuEl.querySelector(`.${closeBtnClassName}`);
      if (hamburgerBtnEl) {
        hamburgerBtnEl.removeEventListener("click", toggleMenu);
        hamburgerBtnEl.remove();
      }
      navEl.classList.remove(navMobileClassName);
      for (let i = 0; i < anchorEls.length; i++) {
        if (anchorEls[i]) {
          anchorEls[i].removeEventListener("click", handleAnchorElClick);
        }
      }
      for (let i = 0; i < liBackEls.length; i++) {
        if (liBackEls[i]) {
          liBackEls[i].remove();
        }
      }
      for (let i = 0; i < iconRightEls.length; i++) {
        if (iconRightEls[i]) {
          iconRightEls[i].remove();
        }
      }
      if (closeBtnEl) {
        closeBtnEl.parentNode.remove();
      }
      removeProperty(menuEl);
      submenuEls.forEach((submenuEl) => {
        removeProperty(submenuEl);
      });

      this.initialized = false;
    }

    function init() {
      if (!this.initialized && !!navEl) {
        navEl.classList.add(navMobileClassName);
        anchorEls.forEach(handleAnchorEl);
        handleNavigation();
        handleMenu();
        handleHamburgerButton();
        handleClickOutside();
        this.initialized = true;
      }
    }

    return {
      destroy: handleDestroy,
      init,
    };
  };
};

window.veda.init();
