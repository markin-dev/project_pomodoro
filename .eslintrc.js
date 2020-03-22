module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
     "parser": "babel-eslint"
  },
  "extends": [
    "airbnb-base",
    "plugin:vue/recommended"
  ],
  "rules": {
    "indent": ["error", 4],
    "comma-dangle" : [
        "error",
        "always-multiline"
    ],
    'vue/html-indent' : ['error', 4],
    "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never",
        "multiline": "always"
    }],
    'vue/max-attributes-per-line': 'error',
    "vue/singleline-html-element-content-newline" : 0,
    'newline-after-var': 0,
  }
};
