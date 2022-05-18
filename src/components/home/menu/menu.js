//const { bind } = require("ramda");

const { store, map } = veda.utils;
const { message } = veda.plugins;
class CountProducts {
  constructor() {
    this.init();
    store.subscribe("addList", this.init.bind(this));
    store.subscribe("compare", this.init.bind(this));
    store.subscribe("addCart", this.init.bind(this));
  }
  getData() {
    return store.get("compare");
  }
  getData2() {
    return store.get("addList");
  }
  getData3() {
    return store.get("addCart");
  }
  getCount() {
    /* A variable that is used to store the data from the store. */
    const { data } = this.getData();
    return data.length;
  }
  getCount2() {
    const { data } = this.getData2();
    return data.length;
  }
  getCount3() {
    const { data } = this.getData3();
    return data.length;
  }
  render() {
    let count = this.getCount();
    return `<div class="pos:absolute t:0 r:0 w:16px h:16px fz:9px bdrs:8px bgc:red fw:500 ta:center jc:center ai:center" style="display: flex; transform: translate(8px, -5px);">${count}</div>`;
  }
  position() {
    const countEl = document.querySelector(".two");
    countEl.innerHTML = this.render();
  }
  render2() {
    let count = this.getCount2();
    return `<div class="pos:absolute t:0 r:0 w:16px h:16px fz:9px bdrs:8px bgc:red fw:500 ta:center jc:center ai:center" style="display: flex; transform: translate(8px, -5px);">${count}</div>`;
  }
  render3() {
    let count = this.getCount3();
    return `<div class="pos:absolute t:0 r:0 w:16px h:16px fz:9px bdrs:8px bgc:red fw:500 ta:center jc:center ai:center" style="display: flex; transform: translate(8px, -5px);">${count}</div>`;
  }
  position2() {
    const countEl = document.querySelector(".three");
    countEl.innerHTML = this.render2();
  }
  position3() {
    const countEl = document.querySelector(".four");
    countEl.innerHTML = this.render3();
  }
  init() {
    this.position();
    this.position2();
    this.position3();
  }
}
class OpenTheComparisonBox {
  constructor() {
    this.el = this.createComparePortal();
    this.mounted();
    this.init();
    store.subscribe("compare", this.init.bind(this));
  }
  mounted() {
    const compareBtnEl = document.querySelector(".two");
    compareBtnEl.addEventListener("click", this.handleTogglePopup.bind(this));
  }
  createComparePortal() {
    const rootEl = document.querySelector("#root");
    const el = document.createElement("div");
    rootEl.appendChild(el);
    return el;
  }
  getData() {
    return store.get("compare");
  }
  handleTogglePopup(e) {
    e.preventDefault();
    store.set("compare", (data) => {
      return {
        ...data,
        visible: !data.visible,
      };
    })("compare/visible");
  }

  handleDelete(event) {
    store.set("compare", (compare) => {
      return {
        ...compare,
        data: compare.data.filter((item) => item.id !== event.currentTarget.id),
      };
    })("compare/remove");
  }

  handleDOM() {
    const { visible, data } = this.getData();
    //  console.log(compare);
    const closeEl = document.querySelector(".close");
    if (closeEl) {
      closeEl.addEventListener("click", this.handleTogglePopup.bind(this));
    }
    if (visible) {
      const btnDelete = this.el.querySelectorAll(".delete-item");
      btnDelete.forEach((item) => {
        console.log(item.parentNode);
        item.parentNode.addEventListener("click", this.handleDelete.bind(this));
      });
    }
  }

  render() {
    const { visible, data } = this.getData();
    if (!visible) {
      return "";
    }
    if (data.length === 0) {
      return /*html */ `
      <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; justify-content: center; align-items: center;">
        <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:100% m:0_50px h:80vh bd:1px_solid_red bgc:#fff ov:hidden">
          <div class = "ml:auto"> <div class="close d:block ml:auto p:12px" style="/* width: 50px; */max-width: 40px;display: flex;justify-content: center;">
            <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
          </div>
          <div class="w:100%">
          <h1 class ="ta:center m:100px">CART IS EMPTY</h1>
          </div>
      </div>
      `;
    }
    return /*html */ `
      <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; justify-content: center; align-items: center;">
        <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:100% m:0_50px h:80vh bd:1px_solid_red bgc:#fff ov:hidden">
          <div class = "ml:auto"> <div class="close d:block ml:auto p:12px" style="/* width: 50px; */max-width: 40px;display: flex;justify-content: center;">
            <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
            </div>
          </div>
          <h3 class ="ta:center">Compare</h3>
          <p class ="ta:center"> Lorem ipsum dolor sit amet, consectetur adipiscing</p>

          <div class = "w:100% h:497px pt:40px ov:auto" style = "display:flex; ">
          <div class="w:25% z:99">
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:350px">Product</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Description</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Availability</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Product Type</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">SKU</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Size</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Color</div>
                <div class="bd:1px_solid_color-gray3 miw:100% fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Option</div>
          </div>
          <div class="w:80% z:99" style="display:flex;">
          ${map(
            data,
            (item) => /*html*/ `
          <div class="d:flex fld:column" style="min-width:300px">
          <div class="product-card d:flex fld:column ai:center ta:center" style="border: 1px solid #ccc;min-height:350px;">
            <div class="product-card__img w:100% pos:relative ov:hidden padding:21px_26px">
              <div class="pet-product-card__image">
                <a href="#" class="core-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
                  <img class="product-card__image bd:none!" src="${item.featured_image.src}" alt="">
                </a>
              </div>
              <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
                <div id=${item.id} class="product-card__icon-bg cur:pointer">
                  <i class="delete-item fas fa-times w:36px h:36px bdrs:50% mb:10px bgc:#fff d:flex jc:center ai:center"></i>
                </div>
              </div>
            </div>
            <div class="product-card__content d:flex fld:column jc:center ai:center">
              <div class="product-card__brand c:color-gray5 mt:11px">${item.vendor}</div>
                <a class="product-card__name fz:16px mt:15px c:color-dark bd:none!" href="#">${item.title}</a>
                <a class="product-card__price mt:14px bd:none!" href="#">
                  <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none bd:none!">${item.price}</ins>
                </a>
              </div>
            </div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
            <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:37px_0 h:98px w:100% ta:center c:color-dark">Abcxyz</div>
          </div>
          `
          )}
          </div>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}
class OpenTheComparisonWishList {
  constructor() {
    this.el = this.createComparePortal();
    this.elWishIcon = document.querySelector(".three");
    this.mounted();
    this.init();
    store.subscribe("addList", this.init.bind(this));
  }
  mounted() {
    this.elWishIcon.addEventListener(
      "click",
      this.handleComparisonWishList.bind(this)
    );
  }
  createComparePortal() {
    const rootEl = document.querySelector("#root");
    const el = document.createElement("div");
    el.className = "wishlist";
    rootEl.appendChild(el);
    return el;
  }
  getData() {
    return store.get("addList");
  }
  handleComparisonWishList() {
    store.set("addList", (state) => {
      return {
        ...state,
        visible: !state.visible,
      };
    })("AddList/Visible");
  }
  handleDelete(event) {
    store.set("addList", (state) => {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== event.currentTarget.id),
      };
    })("AddList/RemoveItem");
  }
  handleWisthList() {
    const { visible } = this.getData();
    if (visible) {
      const buttonCLoseEl = document.querySelector(".close2");
      buttonCLoseEl.addEventListener(
        "click",
        this.handleComparisonWishList.bind(this)
      );
    }
    if (visible) {
      const deleteEls = document.querySelectorAll(".delete-item__wishList");
      deleteEls.forEach((deleteEl) => {
        console.log(deleteEl.parentNode);
        deleteEl.parentNode.addEventListener(
          "click",
          this.handleDelete.bind(this)
        );
      });
    }
  }
  render() {
    const { visible, data } = this.getData();
    if (!visible) {
      return "";
    }
    if (data.length === 0) {
      return /*html*/ `
      <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center;">
      <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
      <div class="box w:400px h:100% bgc:#fff ovy:auto pos:relative" >
        <div class = "ml:auto close2 pos:absolute r:0">
          <div class="close2 d:block ml:auto p:12px" style="">
           <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
           </div>
         </div>
      <div class="h:100% d:flex fld:column jc:center" >
         <h1 class ="ta:center m:100px">CART IS EMPTY</h1>
      </div>
      `;
    }
    return /*html */ `
    <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center;">
       <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
       <div class="box w:400px h:100% bgc:#fff ovy:auto" >
         <div class = "ml:auto close2">
           <div class="close2 d:block ml:auto p:12px" style="/* width: 50px; */max-width: 40px;display: flex;justify-content: center;">
            <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
            </div>
          </div>
       <div class="" >
          <h4 class="fz:30px ta:center" > Wish List </h4>
       </div>
       ${map(
         data,
         (item) => /*html*/ `
         <div class="d:flex fld:column" style="min-width:300px">
         <div class="product-card d:flex fld:column ai:center ta:center" style="min-height:350px;">
           <div class="product-card__img w:100% pos:relative ov:hidden padding:21px_26px">
             <div class="pet-product-card__image">
               <a href="#" class="core-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
                 <img class="product-card__image bd:none!" src="${item.featured_image.src}" alt="">
               </a>
             </div>
             <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
               <div id=${item.id} class="product-card__icon-bg cur:pointer">
                 <i class="delete-item__wishList fas fa-times w:36px h:36px bdrs:50% mb:10px bgc:#fff d:flex jc:center ai:center"></i>
               </div>
             </div>
           </div>
           <div class="product-card__content d:flex fld:column jc:center ai:center">
             <div class="product-card__brand c:color-gray5 mt:11px">${item.vendor}</div>
               <a class="product-card__name fz:16px mt:15px c:color-dark bd:none!" href="#">${item.title}</a>
               <a class="product-card__price mt:14px bd:none!" href="#">
                 <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none bd:none!">${item.price}</ins>
               </a>
             </div>
           </div>
           <div class="box-new__color">
           <script class="box-new__options-json" type="application/json"> {{ item.options_with_values | json }} </script>
           </div>
          <script class="box-news__variants-json" type="application/json" >{{item.variants | json }}</script>
         </div>

         `
       )}
    </div>
    `;
  }
  init() {
    this.el.innerHTML = this.render();
    this.handleWisthList();
  }
}
class OpenTheCompareAdd {
  constructor() {
    this.el = this.createComparePortal();
    this.elAddIcon = document.querySelector(".fa-shopping-bag");
    this.elIcons = document.querySelectorAll(".box-new__buy");
    this.mounted();
    this.init();
    store.subscribe("addCart", this.init.bind(this));
  }
  mounted() {
    this.elAddIcon.addEventListener(
      "click",
      this.handleComparisonWishList.bind(this)
    );
  }
  createComparePortal() {
    const rootEl = document.querySelector("#root");
    const el = document.createElement("div");
    el.className = "addcart";
    rootEl.appendChild(el);
    return el;
  }
  getData() {
    return store.get("addCart");
  }
  handleComparisonWishList() {
    store.set("addCart", (state) => {
      return {
        ...state,
        visible: !state.visible,
      };
    })("AddCart/Visible");
  }
  handleDelete(event) {
    store.set("addCart", (state) => {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== event.currentTarget.id),
      };
    })("RemoveCard");
  }
  handleAddCart() {
    const { visible } = this.getData();
    if (visible) {
      const buttonCLoseEl = document.querySelector(".close3");
      buttonCLoseEl.addEventListener(
        "click",
        this.handleComparisonWishList.bind(this)
      );
    }
    if (visible) {
      const deleteEls = document.querySelectorAll(".delete-card");
      deleteEls.forEach((deleteEl) => {
        deleteEl.parentNode.addEventListener(
          "click",
          this.handleDelete.bind(this)
        );
      });
    }
  }
  renderBeforeUpdate(){
    const { visible, data } = this.getData();
    if(visible){
      const buttonEls = document.querySelectorAll(".buttons_added");
      buttonEls.forEach((buttonEl,index) => {
        const plusEl = buttonEl.querySelector(".plus");
        const minusEl = buttonEl.querySelector(".minus");
        const inputEl = buttonEl.querySelector(".input-qty");
        plusEl.addEventListener("click",() => {
          this.updateItem(index,Number(inputEl.value) + 1);
        })
        minusEl.addEventListener("click",() => {
          if(inputEl.value > 1){
            this.updateItem(index,Number(inputEl.value) - 1);
          }
        })
     })
   }
  }
  updateItem(index,quantity){
    const {visible, data} = this.getData();
    data[index].amount = quantity;
    this.init();
  }
  render() {
    const { visible, data } = this.getData();
    let totals = 0
    data.forEach((dataItem) => {
      totals += dataItem.price * dataItem.amount;
    })
    let template;
    if (!visible) {
      template = ` `;
    }
    if(visible){
      if(data.length === 0) {
        template = `
      <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center;">
        <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="box w:400px h:100% bgc:#fff ovy:auto pos:relative" >
          <div class = "ml:auto close3 pos:absolute r:0">
            <div class="close2 d:block ml:auto p:12px" style="">
             <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
             </div>
           </div>
        <div class="h:100% d:flex fld:column jc:center" >
           <h1 class ="ta:center m:100px">CART IS EMPTY(CART)</h1>
        </div>
      `
      } else {
        template = ` <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center;">
        <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
       <div class="box w:400px h:100% bgc:#fff" >
       <div class="close3 d:block p:12px" style="/* width: 50px; */max-width: 40px;display: flex;justify-content: center; margin-left:auto">
       <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
       </div>
       <div class="" >
          <h4 class="fz:30px ta:center" > Shopping Cart </h4>
       </div>
       <div class="h:100% pos:relative" >
          <div class="h:60% ovx:auto pet-card">
       ${map( data, (item) => /*html*/ `
         <div class="pet-card__item jc:space-between" style="display:flex; border-bottom: 1px solid #ccc; ">
           <div class="w:50%">
              <a href="#" class="core-image-cover d:block bd:none!" css="--aspect-ratio: 3/5">
              <img class=" bd:none!" src="${item.featured_image.src}" alt="">
              </a>
           </div>
           <div class="pr:15px cart-amount">
              <div class=" c:color-gray5 mt:11px">${item.vendor}</div>
              <a class=" mt:14px bd:none!" href="#">
                 <ins class=" fw:500 fz:15px c:color-primary td:none bd:none!">Price:${item.price}$</ins>
                 <ins class=" getPrice d:none fw:500 fz:15px c:color-primary td:none bd:none!">${item.price}</ins>
               </a>
               <div class="d:flex p:14px_0">
                    <div class="buttons_added">
                         <input class="minus is-form" type="button" value="-">
                         <input aria-label="quantity" class="input-qty" max="Số tối đa" min="Số tối thiểu" name="" type="number" style="width:48px;" value = "${item.amount}">
                         <ins class=" getPrice d:none fw:500 fz:15px c:color-primary td:none bd:none!">${item.price}</ins>
                         <input class="plus is-form" type="button" value="+">
                    </div>
                <div id=${item.id} class="ta:center ml:10px " >
                     <button class = "h:100% delete-card" style = "background: #a52828;" >
                         <i class="fas fa-trash-alt"></i>
                     </button> </div>
                 </div>
               </div>
           </div>
       `
       )}
       </div>
       <div class="pos:absolute b:96px w:100% " style="background: #e2e2e2;border-radius: 35px;">
            <div class="p:14px_0 pos:relative" style="display: flex ;justify-content: space-between;padding: 10px 30px;" >
               <div class="fz:18px" style = "width: 100px;">
                <span>Total Bill</span>
               </div>
               <div class = "flag w:100% d:flex ai:center  ">
                  <div class = "flag__Money d:flex" style = " justify-content: center;
                  align-items: center;
                  width: 25px;
                  height: 25px;
                  background-color: #6B8068;
                  border-radius: 25px;
                  font-size: 8px;
                  " >
                    <span class = "flag__Money-Text c:#fff" style = "flag__USD-Text cursor: pointer;">USD</span>
                  </div>
               </div>
               <div class=" total pos:absolute r:20px">${totals}$</div>
            </div>
            <div class="">
              <button class="w:100% p:15px_0" style="border-radius: initial;"> Payment </button>
            </div>
       </div>
       </div>
       `
      }
    }
    this.el.innerHTML = template;
    this.renderBeforeUpdate();
  }
  total() {
    const { visible, data } = this.getData();
    const EXCHANGE__RATE = 23000;
    let total = data.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    );
    return total;
  }
  changeMoney() {
    const { visible, data } = this.getData();
    let totals = this.total();
    const EXCHANGE__RATE = 23000;
    if (visible) {
      if(data.length > 0){
        const moneyEl = document.querySelector(".flag__Money");
        const totalEl = document.querySelector(".total");
        const text = moneyEl.querySelector(".flag__Money-Text");
        const defaultUSD = totalEl.innerHTML;
        moneyEl.addEventListener("click", () => {
          if (text.innerHTML === "USD") {
            let formatUSD = new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totals * EXCHANGE__RATE);
            totalEl.innerHTML = formatUSD;
            text.innerHTML = "VND";
            moneyEl.style.background = "red";
          } else {
            totalEl.innerHTML = defaultUSD;
            moneyEl.style.background = "#6B8068";
            text.innerHTML = "USD";
          }
        });
      }
    }
  }
  init() {
    this.render();
    this.handleAddCart();
    this.changeMoney();
  }
}

class OpenMenuMobile {
  constructor() {
    this.elOverlay = document.querySelector(".container-box__overlay");
    this.elMobile = document.querySelector(".menu-mobile");
    this.elContainMenuMoblile = document.querySelector(
      ".container-box__mobile"
    );
    this.elBarsMobile = document.querySelector(".barsMobile");
    this.init();
  }
  handleCloseMobile(e) {
    this.elOverlay.style.display = "none";
    this.elMobile.style.display = "none";
    this.elContainMenuMoblile.style.display = "none";
  }
  handleOpenMobile(e) {
    this.elOverlay.style.display = "block";
    this.elMobile.style.display = "block";
    this.elContainMenuMoblile.style.display = "block";
  }
  handleMenuMobile() {
    this.elOverlay.addEventListener("click", this.handleCloseMobile.bind(this));
    this.elBarsMobile.addEventListener(
      "click",
      this.handleOpenMobile.bind(this)
    );
  }
  render() {
    //  let { visible } = this.handleCloseandOpen();
    //console.log(visible);
  }
  init() {
    //  this.render();
    this.handleMenuMobile();
  }
}

new CountProducts();
new OpenTheCompareAdd();
new OpenTheComparisonWishList();
new OpenTheComparisonBox();
new OpenMenuMobile();



// if (data.length === 0) {
    //   return /*html*/ `
    //   <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center;">
    //   <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
    //   <div class="box w:400px h:100% bgc:#fff ovy:auto pos:relative" >
    //     <div class = "ml:auto close3 pos:absolute r:0">
    //       <div class="close2 d:block ml:auto p:12px" style="">
    //        <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
    //        </div>
    //      </div>
    //   <div class="h:100% d:flex fld:column jc:center" >
    //      <h1 class ="ta:center m:100px">CART IS EMPTY(CART)</h1>
    //   </div>
    //   `;
    // // }


    // return /*html */ `
    // <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%" style="display:flex; align-items: center;">
    //    <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
    //    <div class="box w:400px h:100% bgc:#fff" >
    //    <div class="close3 d:block p:12px" style="/* width: 50px; */max-width: 40px;display: flex;justify-content: center; margin-left:auto">
    //    <i class="fz:26px c:color-gray9.4 fal fa-times background: #C4C4C4;"></i>
    //    </div>
    //    <div class="" >
    //       <h4 class="fz:30px ta:center" > Shopping Cart </h4>
    //    </div>
    //    <div class="h:100% pos:relative" >
    //       <div class="h:60% ovx:auto pet-card">
    //    ${map( data, (item) => /*html*/ `
    //      <div class="pet-card__item jc:space-between" style="display:flex; border-bottom: 1px solid #ccc; ">
    //        <div class="w:50%">
    //           <a href="#" class="core-image-cover d:block bd:none!" css="--aspect-ratio: 3/5">
    //           <img class=" bd:none!" src="${item.featured_image.src}" alt="">
    //           </a>
    //        </div>
    //        <div class="pr:15px cart-amount">
    //           <div class=" c:color-gray5 mt:11px">${item.vendor}</div>
    //           <a class=" mt:14px bd:none!" href="#">
    //              <ins class=" fw:500 fz:15px c:color-primary td:none bd:none!">Price:${item.price}$</ins>
    //              <ins class=" getPrice d:none fw:500 fz:15px c:color-primary td:none bd:none!">${item.price}</ins>
    //            </a>
    //            <div class="d:flex p:14px_0">
    //             <div class="cart-quantity cart-column">
    //               <input class="maw:81px cart-quantity-input" type="number" min="1" value = "${item.amount}">
    //               <ins class=" getPrice d:none fw:500 fz:15px c:color-primary td:none bd:none!">${item.price}</ins>
    //             </div>
    //             <div id=${item.id} class="ta:center ml:10px " >
    //                  <button class = "h:100% delete-card" style = "background: #a52828;" >
    //                      <i class="fas fa-trash-alt"></i>
    //                  </button> </div>
    //              </div>
    //            </div>
    //        </div>
    //    `
    //    )}
    //    </div>
    //    <div class="pos:absolute b:96px w:100% " style="background: #e2e2e2;border-radius: 35px;">
    //         <div class="p:14px_0 pos:relative" style="display: flex ;justify-content: space-between;padding: 10px 30px;" >
    //            <div class="fz:18px" style = "width: 100px;">
    //             <span>Total Bill</span>
    //            </div>
    //            <div class = "flag w:100% d:flex ai:center  ">
    //               <div class = "flag__Money d:flex" style = " justify-content: center;
    //               align-items: center;
    //               width: 25px;
    //               height: 25px;
    //               background-color: #6B8068;
    //               border-radius: 25px;
    //               font-size: 8px;
    //               " >
    //                 <span class = "flag__Money-Text c:#fff" style = "flag__USD-Text cursor: pointer;">USD</span>
    //               </div>
    //            </div>
    //            <div class=" total pos:absolute r:20px">${totals}$</div>
    //         </div>
    //         <div class="">
    //           <button class="w:100% p:15px_0" style="border-radius: initial;"> Payment </button>
    //         </div>
    //    </div>
    //    </div>
    // `;
