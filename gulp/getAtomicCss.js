const { atomic } = require("mota-css");

atomic.setConfig({
  breakpoints: {
    sm: "768px",
    md: "992px",
    lg: "1200px",
  },
  useRtl: true,
  custom: {
    "font-primary": "var(--font-primary)",
    "font-secondary": "var(--font-secondary)",
    "font-tertiary": "var(--font-tertiary)",
    "font-quaternary": "var(--font-quaternary)",
    "color-primary": "var(--color-primary)",
    "color-secondary": "var(--color-secondary)",
    "color-tertiary": "var(--color-tertiary)",
    "color-quaternary": "var(--color-quaternary)",
    "color-dark": "var(--color-dark)",
    "color-gray9": "var(--color-gray9)",
    "color-gray8": "var(--color-gray8)",
    "color-gray7": "var(--color-gray7)",
    "color-gray6": "var(--color-gray6)",
    "color-gray5": "var(--color-gray5)",
    "color-gray4": "var(--color-gray4)",
    "color-gray3": "var(--color-gray3)",
    "color-gray2": "var(--color-gray2)",
    "color-gray1": "var(--color-gray1)",
    "color-light": "var(--color-light)",
    "color-variable-16": "var(--color-variable-16)",
    "color-variable-17": "var(--color-variable-17)",
    "color-variable-18": "var(--color-variable-18)",
    "color-variable-19": "var(--color-variable-19)",
    "color-variable-20": "var(--color-variable-20)",
    "color-variable-21": "var(--color-variable-21)",
    "color-variable-22": "var(--color-variable-22)",
    "color-variable-23": "var(--color-variable-23)",
    "color-variable-24": "var(--color-variable-24)",
    "color-variable-25": "var(--color-variable-25)",
    "font-variable-5": "var(--font-variable-5)",
    "font-variable-6": "var(--font-variable-6)",
    "font-variable-7": "var(--font-variable-7)",
    "font-variable-8": "var(--font-variable-8)",
    "font-variable-9": "var(--font-variable-9)",
    "font-variable-10": "var(--font-variable-10)",
    "font-variable-11": "var(--font-variable-11)",
    "font-variable-12": "var(--font-variable-12)",
    "font-variable-13": "var(--font-variable-13)",
    "font-variable-14": "var(--font-variable-14)",

    "font-primary-freeze": "var(--font-primary-freeze)",
    "font-secondary-freeze": "var(--font-secondary-freeze)",
    "font-tertiary-freeze": "var(--font-tertiary-freeze)",
    "font-quaternary-freeze": "var(--font-quaternary-freeze)",
    "color-primary-freeze": "var(--color-primary-freeze)",
    "color-secondary-freeze": "var(--color-secondary-freeze)",
    "color-tertiary-freeze": "var(--color-tertiary-freeze)",
    "color-quaternary-freeze": "var(--color-quaternary-freeze)",
    "color-dark-freeze": "var(--color-dark-freeze)",
    "color-gray9-freeze": "var(--color-gray9-freeze)",
    "color-gray8-freeze": "var(--color-gray8-freeze)",
    "color-gray7-freeze": "var(--color-gray7-freeze)",
    "color-gray6-freeze": "var(--color-gray6-freeze)",
    "color-gray5-freeze": "var(--color-gray5-freeze)",
    "color-gray4-freeze": "var(--color-gray4-freeze)",
    "color-gray3-freeze": "var(--color-gray3-freeze)",
    "color-gray2-freeze": "var(--color-gray2-freeze)",
    "color-gray1-freeze": "var(--color-gray1-freeze)",
    "color-light-freeze": "var(--color-light-freeze)",
    "color-variable-16-freeze": "var(--color-variable-16-freeze)",
    "color-variable-17-freeze": "var(--color-variable-17-freeze)",
    "color-variable-18-freeze": "var(--color-variable-18-freeze)",
    "color-variable-19-freeze": "var(--color-variable-19-freeze)",
    "color-variable-20-freeze": "var(--color-variable-20-freeze)",
    "color-variable-21-freeze": "var(--color-variable-21-freeze)",
    "color-variable-22-freeze": "var(--color-variable-22-freeze)",
    "color-variable-23-freeze": "var(--color-variable-23-freeze)",
    "color-variable-24-freeze": "var(--color-variable-24-freeze)",
    "color-variable-25-freeze": "var(--color-variable-25-freeze)",
    "font-variable-5-freeze": "var(--font-variable-5-freeze)",
    "font-variable-6-freeze": "var(--font-variable-6-freeze)",
    "font-variable-7-freeze": "var(--font-variable-7-freeze)",
    "font-variable-8-freeze": "var(--font-variable-8-freeze)",
    "font-variable-9-freeze": "var(--font-variable-9-freeze)",
    "font-variable-10-freeze": "var(--font-variable-10-freeze)",
    "font-variable-11-freeze": "var(--font-variable-11-freeze)",
    "font-variable-12-freeze": "var(--font-variable-12-freeze)",
    "font-variable-13-freeze": "var(--font-variable-13-freeze)",
    "font-variable-14-freeze": "var(--font-variable-14-freeze)",
  },
});

atomic.customValue((value) => {
  const regexp = /\.\d*/g;
  if (regexp.test(value) && value.includes("color")) {
    const val = value.replace(regexp, "");
    const alpha = value.replace(/.*(?=\.\d*)/g, "");
    return `rgba(var(--rgb-${val}), ${alpha})`;
  }
  return value;
});

exports.setAtomicCss = (str) => {
  atomic.find(str);
};

exports.getAtomicCss = () => {
  const css = atomic.getCss();

  return css;
};
