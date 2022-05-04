type Logger = (actionName: string) => void;
type Unsubscibe = () => void;
type Colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];
interface MobileMenuOptions {
  width?: number;
  duration?: number;
  navSelector?: string;
  menuSelector?: string;
  linkSelector?: string;
  subMenuSelector?: string;
  backClassName?: string;
  closeClassName?: string;
  hamburgerButtonPosition?: string;
  renderHamburgerButton?: (className: string) => string;
  renderBackButton?: (className: string) => string;
  renderCloseButton?: (className: string) => string;
}
interface MobileMenuReturn {
  init(): void;
  destroy(): void;
}

declare interface Veda {
  utils: {
    objStrParse(value: string): Record<string, any>;
    isMobile: {
      android: boolean;
      blackBerry: boolean;
      ipad: boolean;
      iOS: boolean;
      opera: boolean;
      windows: boolean;
      any: boolean;
    };
    storage: Storage;
    store: {
      get(stateName?: string): Record<string, any>;
      create<T extends any>(stateName: string, options: { initialState: T, useStorage: boolean }): void;
      set<T extends any>(stateName: string, state: T): Logger;
      subscribe<T extends any>(stateName: string, listener: (state: T) => void): Unsubscibe;
    },
    getColorNames(): Colors;
    map<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): string;
  }
  plugins: {
    /** Theme toggle
     * @example ts
     * const masonry = veda.plugins.masonry('.masonry', {
     *   defaultColumn: 3,
     *   gap: 10,
     *   columnClassName: "masonry__item",
     *   responsive: [
     *     { breakpoint: 480, column: 2 },
     *     { breakpoint: 768, column: 3 },
     *     { breakpoint: 992, column: 4 }
     *   ]
     * });
     * masonry.on("load", () => {
     *   console.log("load");
     * });
     * masonry.on("resize", () => {
     *   console.log("resize");
     * });
     *
     */
     masonry(selector: string, options: {
      defaultColumn?: number;
      gap?: number;
      columnClassName?: string;
      responsive?: ({
        breakpoint: number;
        column: number;
      })[];
     }): void;

    /** Theme toggle
     * @example ts
     * veda.plugins.themeToggle(container);
     *
     */
    themeToggle(container: HTMLElement): void;

    /** Countdown
     * @example ts
     * veda.plugins.countdown(container);
     *
     */
    countdown(container: HTMLElement): void;

    /** Swiper
     * @example ts
     * veda.plugins.swiper(container);
     *
     */
    swiper(container: HTMLElement): void;

    /** Tabs
     * @example ts
     * veda.plugins.tabs(container);
     *
     */
    tabs(container: HTMLElement): void;

    /** Collapse
     * @example ts
     * veda.plugins.collapse(container);
     *
     */
    collapse(container: HTMLElement): void;

    /** Image Zoom
     * @example ts
     * veda.plugins.imageZoom(container);
     *
     */
    imageZoom(container: HTMLElement): void;

    /** Image Zoom
     * @example ts
     * veda.plugins.mobileMenu(container, {
     *  navSelector: ".pet-nav",
     *  menuSelector: ".pet-nav__menu",
     *  linkSelector: ".pet-nav__link",
     *  subMenuSelector: ".pet-nav__sub-list",
     *  backClassName: "pet-nav__list-item-back p:15px c:color-gray9 bdb:1px_solid_color-gray2",
     *  closeClassName: "pet-nav__close p:8px_15px c:color-gray9 bdb:1px_solid_color-gray2",
     * });
     * function checkResponsive() {
     *  if (window.innerWidth > 992) {
     *    menu.destroy();
     *  } else {
     *    menu.init();
     *  }
     * }
     * checkResponsive();
     * window.addEventListener("resize", checkResponsive);
     *
     */
     mobileMenu(container: HTMLElement, options: MobileMenuOptions): MobileMenuReturn;
  }
}

declare const veda: Veda;
