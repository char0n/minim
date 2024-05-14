module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020, // allows for the parsing of modern ECMAScript features
    sourceType: 'module', // allows for the use of imports
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-underscore-dangle': 'off',
    'no-return-await': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off', // ['error', { devDependencies: true }],
    'import/no-mutable-exports': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    "import/extensions": [
      "error",
      "always",
      {
        "ignorePackages": true
      }
    ],
    'no-labels': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
  },
  plugins: ['import'],
  extends: [
    'airbnb-base',
    "eslint-config-airbnb-base",
    'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
};
