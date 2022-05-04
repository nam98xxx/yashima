const uniqueId = "products";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

class CardColors {
  constructor(el) {
    /** @type {HTMLElement} */
    this.el = el;
    /** @type {HTMLElement | null} */
    this.variantJsonEl = this.getVariantJsonEl();
    this.state = {
      colors: [],
      selectedColor: '',
      variants: []
    }
    this.mounted();
    this.init();
  }

  static map(arr, callback) {
    return arr.map(callback).join('')
  }

  setState(state) {
    if (typeof state === 'function') {
      this.state = { ...this.state, ...state(this.state) }
    } else {
      this.state = { ...this.state, ...state }
    }
  }

  mounted() {
    this.optionEl = this.el.querySelector(".pet-product-card__options-json");
    if (!!this.optionEl) {
      const newData = JSON.parse(this.optionEl.textContent).find(item => /Colou?r/g.test(item.name)) || {};
      const variants = JSON.parse(this.variantJsonEl.textContent) || {};
      this.setState(prevState => ({
        colors: newData.values || prevState.colors,
        selectedColor: newData.selected_value || prevState.selectedColor,
        variants: variants || prevState.variants
      }));
    }
  }

  getVariantJsonEl() {
    const variantJsonEl = this.el.nextElementSibling
    if (variantJsonEl.className.includes("pet-product-card__variants-json")) {
      return variantJsonEl;
    }
    return null;
  }

  checkColor(color) {
    return veda.utils.getColorNames().includes(color.toLowerCase());
  }

  render() {
    const { colors, selectedColor } = this.state;
    return CardColors.map(colors, color => {
      if (!this.checkColor(color)) {
        return ``;
      }
      const active = color.toLowerCase() === selectedColor.toLowerCase();
      return `
        <div class="pet-product-card__colors-item cur:pointer w:20px h:20px m:2px bdrs:10px ${active ? 'bd:2px_solid_red' : ''}" style="background-color: ${color.toLowerCase()}"></div>
      `
    })
  }

  updateImage() {
    const { variants, selectedColor } = this.state;
    const variant = variants.find(variant => variant.options.map(item => item.toLowerCase()).includes(selectedColor));
    const { src } = variant.image;
    const imgEl = this.el.closest('.pet-product-card').querySelector('.pet-product-card__img');
    imgEl.src = src;
  }

  handleClick(event) {
    const currentEl = event.currentTarget;
    const colorEls = this.el.querySelectorAll('.pet-product-card__colors-item');
    this.setState({
      selectedColor: currentEl.style.backgroundColor
    });
    this.update();
    this.updateImage();
  }

  handleDOM() {
    const colorEls = this.el.querySelectorAll('.pet-product-card__colors-item');
    colorEls.forEach(colorEl => {
      colorEl.addEventListener('click', this.handleClick.bind(this));
    })
  }

  update() {
    this.init();
  }

  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}

const colorWrapEls = container.querySelectorAll(".pet-product-card__colors");

colorWrapEls.forEach(el => new CardColors(el));
console.log(123);
