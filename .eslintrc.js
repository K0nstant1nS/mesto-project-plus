module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
          '.js',
          '.json',
        ],
      },
    },
    'import/extensions': [
      '.js',
      '.ts',
    ],
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_id',
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'linebreak-style': 0,
    'consistent-return': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-empty-function': 'off',
    'class-methods-use-this': 'off',
  },
};
