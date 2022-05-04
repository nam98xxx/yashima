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
  logo: {
    title: "Best Seller",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet .",
    title_design: "",
    description_design: "",
  },
  navigation: {
    arrow: true,
    menu: [
      {
        label: "Home",
        iconEnabled: false,
        href: "#",
      },
      {
        label: "Shop",
        iconEnabled: false,
        href: "#",
      },
      {
        label: "Blog",
        iconEnabled: false,
        href: "#",
        children: [
          {
            label: "Blog 1",
            href: "#",
          },
          {
            label: "Blog 2",
            href: "#",
          },
          {
            label: "Blog",
            iconEnabled: false,
            href: "#",
            children: [
              {
                label: "Blog 1",
                href: "#",
              },
              {
                label: "Blog 2",
                href: "#",
              },
            ],
          },
        ],
      },
      {
        label: "Product",
        iconEnabled: false,
        href: "#",
      },
      {
        label: "Page",
        iconEnabled: false,
        href: "#",
      },
    ],
    caret_enabled: true,
  },
  content: {},
};
