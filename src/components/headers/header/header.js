const uniqueId = "header";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

function createMenu({
  width = 300,
  duration = 200,
  renderHamburgerButton,
  renderBackButton,
}) {
  /** @type {HTMLElement} */
  const navEl = document.querySelector(".pet-nav");
  /** @type {HTMLUListElement} */
  const menuEl = navEl.querySelector(".pet-nav__menu");
  /** @type {NodeListOf<HTMLLIElement>} */
  const anchorEls = menuEl.querySelectorAll(".pet-nav__link");
  /** @type {NodeListOf<HTMLLIElement>} */
  const submenuEls = menuEl.querySelectorAll(".pet-nav__sub-list");
  /** @type {HTMLElement} */
  const hamburgerBtnEl = renderHamburgerButton();
  const initialized = false;
  let isActive = false;
  const navMobileClassName = "pet-nav--mobile";

  function handleNavigation() {
    navEl.insertAdjacentElement("afterbegin", hamburgerBtnEl);
  }

  function handleMenu() {
    menuEl.style.width = `${width}px`;
    menuEl.style.left = `-${width}px`;
    menuEl.style.transition = `transform ${duration}ms`;
  }

  function handleHamburgerButtonClick() {
    isActive = !isActive;
    menuEl.style.transform = isActive ? "translateX(100%)" : "translateX(0)";
  }

  function handleHamburgerButton() {
    hamburgerBtnEl.addEventListener("click", handleHamburgerButtonClick);
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
    listEl.classList.add("pet-nav__list-item-back");
    /** @type {HTMLElement} */
    const backButtonEl = renderBackButton();
    listEl.appendChild(backButtonEl);
    if (!!submenuEl) {
      anchorEl.textContent = anchorEl.textContent;
      submenuEl.style.left = `-${width}px`;
      submenuEl.style.transition = `transform ${duration}ms`;
      submenuEl.insertAdjacentElement("afterbegin", listEl);
      backButtonEl.addEventListener("click", handleBackButtonClick);
    }
  }

  function handleClickOutside() {
    window.addEventListener("click", (event) => {
      if (!navEl.contains(event.target)) {
        if (isActive) {
          handleHamburgerButtonClick();
        }
      }
    });
  }

  function handleDestroy() {
    const liBackEls = menuEl.querySelectorAll(".pet-nav__list-item-back");
    hamburgerBtnEl.removeEventListener("click", handleHamburgerButtonClick);
    navEl.classList.remove(navMobileClassName);
    for (let i = 0; i < anchorEls.length; i++) {
      anchorEls[i].removeEventListener("click", handleAnchorElClick);
    }
    for (let i = 0; i < liBackEls.length; i++) {
      if (liBackEls[i]) {
        liBackEls[i].remove();
      }
    }
    hamburgerBtnEl.remove();
    menuEl.style.removeProperty("width");
    menuEl.style.removeProperty("left");
    menuEl.style.removeProperty("transform");
    menuEl.style.removeProperty("transition");
    menuEl.style.removeProperty("overflow-y");
    submenuEls.forEach((submenuEl) => {
      submenuEl.style.removeProperty("width");
      submenuEl.style.removeProperty("left");
      submenuEl.style.removeProperty("transform");
      submenuEl.style.removeProperty("transition");
      submenuEl.style.removeProperty("overflow-y");
    });

    this.initialized = false;
  }

  function init() {
    if (!this.initialized) {
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
}

const menu = createMenu({
  width: 300,
  duration: 200,
  renderHamburgerButton() {
    const hamburgerBtnEl = document.createElement("button");
    hamburgerBtnEl.textContent = "Button";
    return hamburgerBtnEl;
  },
  renderBackButton() {
    const btnEl = document.createElement("button");
    btnEl.textContent = "Back";
    return btnEl;
  },
});

function checkResponsive() {
  if (window.innerWidth > 992) {
    menu.destroy();
  } else {
    menu.init();
  }
}

checkResponsive();

window.addEventListener("resize", checkResponsive);
