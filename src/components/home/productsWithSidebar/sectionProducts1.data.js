const data = {
  general_settings: {
    fixed: false,
    background_color_enable: false,
    color: "transparent",
    background_image_enable: true,
    image: "",
    size: "cover",
    overlay: "transparent",
  },
  heading: {
    title: "Best Seller",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet .",
    title_design: "",
    description_design: "",
  },
  button_view_all: {
    enable: true,
    text: "View All",
    link: "#",
    target: "_self",
    design: "",
  },
  sidebar: {
    banner_img: "img/banner-1.png",
    banner_sub_title: "TREATS & GROOMING",
    banner_title: "Spoil your true love",
    categories_title: "Categories",
    categories: [
      {
        icon: "<i class='fal fa-football-ball'></i>",
        label: "Adult Dry Dog Food",
        iconEnabled: true,
        href: "#",
        hasMegaMenu: true,
        children: [
          {
            megaMenuEnabled: true,
            megaMenuId: "1",
          },
        ],
      },
      {
        icon: "<i class='fal fa-hotdog'></i>",
        label: "Cat Food",
        iconEnabled: true,
        href: "#",
      },
      {
        icon: "<i class='fal fa-dog'></i>",
        label: "Dog Supplement & animal ",
        iconEnabled: true,
        href: "#",
        children: [
          {
            label: "Dog Submenu 1",
            href: "#",
          },
          {
            label: "Dog Submenu 2",
            href: "#",
          },
        ],
      },
    ],
    caret_enabled: true,
  },
  content: {
    collection: "402337759453",
    review_app_enable: true,
    review_app_app: "product_reviews", // "product_reviews" or "rivyo_reviews" or "loox_reviews"
    sale_enable: true,
    sale_text: "Sale",
    sale_design: "",
    add_to_cart_text: "Add to cart",
    add_to_cart_design: "",
    quantity_product_displayed: 6,
    column: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
    },
  },
};
