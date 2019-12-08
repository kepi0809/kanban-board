module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/standard',
    'prettier/vue',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/attribute-hyphenation': [
      'error',
      'never',
      {
        ignore: ['stroke-width', 'stroke-linecap', 'stroke-linejoin'],
      },
    ],
  },
}
