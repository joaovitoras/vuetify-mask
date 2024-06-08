// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "plugin:vuetify/base",
  ],
  rules: {
    // eslint-disable-next-line no-undef
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // eslint-disable-next-line no-undef
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
