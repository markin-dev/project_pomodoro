module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true,
  },
  "globals": {
    "chrome": "readonly",
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
    'vue/html-indent' : ['error', 4],
    "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never",
        "multiline": "always"
    }],
    'vue/max-attributes-per-line': 'error',
    "vue/singleline-html-element-content-newline" : 0,
    'newline-after-var': 0,
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
  }
};
