module.exports = {
  "extends": ["airbnb", "prettier"],
  "plugins": [
    "import",
    "jquery"
  ],
  "env": {
    "browser": true,
    "jquery": true
  },
  "rules": {
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "max-len": ['error', {
      "ignoreStrings": true,
      "tabWidth": 2,
      "ignoreTemplateLiterals": true,
      "ignoreUrls": true
    }]
  }
};
