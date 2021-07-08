module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
    jest: true,
    "jest/globals": true
  },
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      rules: {
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/ban-ts-comment": "off",

        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "object-curly-spacing": [
      2,
      "always",
      { "objectsInObjects": true }
    ],
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "curly": "error",
    "comma-dangle": ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "printWidth": 110,
        "singleQuote": true,
        "semi": true,
        "tabWidth": 2,
        "trailingComma": "none"
      }
    ]
  }
};
