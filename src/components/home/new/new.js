const uniqueId = "newarrivals";
const { store } = veda.utils;
const { message } = veda.plugins;
const container = document.querySelector(`[data-id="${uniqueId}"]`);

class CompareAdd {
  constructor() {
    this.init();
  }

  createCompareAdd() {
    veda.utils.store.create("compare", {
      initialState: {
        data: [],
        visible: false,
      },
      useStorage: true
    })
  }

  getData() {
    return store.get("compare");
  }
  handleCompares() {
    let {data}= this.getData();
    const contaiEl = document.querySelector(".contain-new");
    const compareEls = contaiEl.querySelectorAll(".btn-compare");
    compareEls.forEach((compareEl) => {
      const dataEl = compareEl.querySelector(".box-news__products-json");
      let hasId = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if (hasId) {
        compareEl.style.backgroundColor = "#AF0707";
      }
      compareEl.addEventListener("click", (e) => {
        e.preventDefault();
        if (hasId) {
          compareEl.style.backgroundColor = "#AF0707";
          message.error(`Product added to cart`);
        } else {
          message.success(`Product add to cart`);
          store.set("compare", (items) => {
           return {
            ...items,
            data: [...items.data ,JSON.parse(dataEl.textContent)]
          };
          })("compare/Add");
          hasId = !hasId;
        }
      });
    });
  }
  init() {
    this.createCompareAdd();
    this.handleCompares();
  }
}
class AddWishList {
  constructor() {
    this.init();
  }
  createAddList() {
    veda.utils.store.create("addList", {
      initialState: {
        data:[],
        visible: false,
      },
      useStorage: true
    });
  }
  getData() {
    return store.get("addList");
  }
  handleAddList() {
    const {data} = this.getData();
    const contaiEl = document.querySelector(".contain-new");
    const wishlistEls = contaiEl.querySelectorAll(".btn-addlist");
    wishlistEls.forEach((item) => {
      const dataEl = item.querySelector(".box-news__products-json1");
      let hasId = data.find((value) => value.id === JSON.parse(dataEl.textContent).id);
      if(hasId) {
        item.style.backgroundColor = "#AF0707";
      }
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if(hasId){
          item.style.backgroundColor = "#AF0707";
          message.error(`Product added to Wish List`)
        } else {
          message.success(`Product add to Wish List`)
          store.set("addList", (wishlist) => {
            return {
              ...wishlist,
              data: [...wishlist.data,JSON.parse(dataEl.textContent)]
            }
          })("wishList/Add");
          hasId = !hasId
        }
      });
    });
  }
  init() {
    this.createAddList();
    this.handleAddList();
  }
}
class CardColors {
  constructor(el) {
    /** @type {HTMLElement} */
    this.el = el;
    /** @type {HTMLElement | null} */
    this.variantJsonEl = this.getVariantJsonEl();
    this.state = {
      colors: [],
      selectedColor: "",
      variants: [],
    };
    this.mounted();
    this.init();
  }

  static map(arr, callback) {
    return arr.map(callback).join("");
  }

  setState(state) {
    if (typeof state === "function") {
      this.state = { ...this.state, ...state(this.state) };
    } else {
      this.state = { ...this.state, ...state };
    }
  }

  mounted() {
    this.optionEl = this.el.querySelector(".box-new__options-json");
    if (!!this.optionEl) {
      const { textContent } = this.optionEl;
      const newData =
        JSON.parse(textContent).find((item) => /Colou?r/g.test(item.name)) ||
        {};
      const variants = JSON.parse(this.variantJsonEl.textContent) || {};
      this.setState((prevState) => ({
        colors: newData.values || prevState.colors,
        selectedColor: newData.selected_value || prevState.selectedColor,
        variants: variants || prevState.variants,
      }));
    }
  }

  getVariantJsonEl() {
    const variantJsonEl = this.el.nextElementSibling;
    if (variantJsonEl.className.includes("box-news__variants-json")) {
      return variantJsonEl;
    }
    return null;
  }

  checkColor(color) {
    return veda.utils.getColorNames().includes(color.toLowerCase());
  }

  render() {
    const { colors, selectedColor } = this.state;
    return CardColors.map(colors, (color) => {
      if (!this.checkColor(color)) {
        return ``;
      }
      const active = color.toLowerCase() === selectedColor.toLowerCase();
      return `
        <div class="box-new__colors-item w:32px h:32px bdrs:16px m:10px_6px_0px_6px cur:pointer p:3px bgcp:content-box ${
          active ? "bd:1px_solid_color-dark" : "bd:1px_solid_color-gray2"
        }" style="background-color: ${color.toLowerCase()}"></div>
      `;
    });
  }

  updateImage() {
    const { variants, selectedColor } = this.state;
    console.log(this.state);
    console.log(this.el);
    console.log(this.el.closest(".box-new"));
    const variant = variants.find((variant) =>
      variant.options.map((item) => item.toLowerCase()).includes(selectedColor)
    );
    const { src } = variant.image;
    const imgEl = this.el
      .closest(".box-new")
      .querySelector(".pet-product-card__img");
    imgEl.src = src;
  }

  handleClick(event) {
    const currentEl = event.currentTarget;
    const colorEls = this.el.querySelectorAll(".box-new__colors-item");
    this.setState({
      selectedColor: currentEl.style.backgroundColor,
    });
    this.update();
    this.updateImage();
  }

  handleDOM() {
    const colorEls = this.el.querySelectorAll(".box-new__colors-item");
    colorEls.forEach((colorEl) => {
      colorEl.addEventListener("click", this.handleClick.bind(this));
    });
  }

  update() {
    this.init();
  }

  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}

class QuickView {
  constructor(){
    this.elIcons = document.querySelectorAll(".btn-quickView");
    this.el = this.createBoxQuickView();
    this.init();
    store.subscribe("viewVisible", this.init.bind(this));
  }
  createBoxQuickView(){
    const rootEl = document.querySelector("#root");
    const el = document.createElement("div");
    el.classList.add("quickView");
    rootEl.appendChild(el);
    return el;
  }
  handleQuickView(){
    this.elIcons.forEach((el,index) => {
      const dataEl = el.querySelector(".box-news__products-json2");
      let data = JSON.parse(dataEl.textContent);
      el.addEventListener("click", () => {
        this.el.innerHTML = /*html*/ `
        <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center; justify-content: center;">
        <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="box w:60% h:350px bgc:#fff" >
        <div class="closeView d:block p:12px" style="/* width: 50px; */max-width: 40px;display: flex;justify-content: center; float:right;">
            <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
            </div>
        <div class = "h:100%" style="display:flex;">
          <div class="h:100%">
            <img class="product-card__image bd:none! w:900px h:100%" style ="object-fit: cover;" src="${data.featured_image.src}" alt="">
          </div>
          <div style="padding: 30px 17px 17px 25px;">
            <h2 class="fz:30px" style="padding-bottom: 10px;">${data.title}</h2>
            <ins class="c:color-dark td:none bd:none! fz:25px">$${data.price}</ins>
            <div>
              <p style="padding-top: 10px;">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias</p>
            </div>
            <div>
              <p class="fw:400 fz:15px c:color-dark" style="padding-top: 10px;">View Details</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        `;
        const closeEl = document.querySelector(".closeView");
        if(closeEl){
          closeEl.addEventListener("click",() => {
            this.el.innerHTML = " ";
          })
        }
      })
    })
  }

  init(){
    this.handleQuickView();
  }
}
new AddWishList();
new CompareAdd();
new QuickView();
const colorWrapEls = container.querySelectorAll(".box-new__color");
console.log(colorWrapEls);
colorWrapEls.forEach((el) => new CardColors(el));

