module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    '.eslintrc.*',
    'prettier.config.*',
    'commitlint.config.*',
    'jest.config.*',
    'rollup.config.*',
  ],
  rules: {
    'object-shorthand': 'off',
  },
}
