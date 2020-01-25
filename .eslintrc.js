module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-typescript/base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
        "class-methods-use-this": "off",
        "no-restricted-syntax": "off"
    },
    "overrides": [{
        "files": [ "*.spec.ts" ],
        "rules": {
          "max-classes-per-file": 0,
          "@typescript-eslint/no-unused-vars": 0
        }
    }]
};