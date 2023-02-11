module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'linebraek-style': 0,
    'no-console': 'off',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
