/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  env: {
    node: true
  }
}
