'use strict';

module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    mocha: true
  },
  /* eslint:recommended property enables rules that report common problems 
       See the list at https://eslint.org/docs/rules/ */
  /* eslint/prettier integration read https://bit.ly/3kQFe3u */
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'strict': 'error',
    'semi': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'prettier/prettier': 'error'
  },
  plugins: ['prettier']
};
