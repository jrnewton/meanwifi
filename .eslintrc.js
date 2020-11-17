module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    mocha: true
  },
  /* eslint:recommended property enables rules that report common problems 
       See the list at https://eslint.org/docs/rules/ */
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    strict: 'error',
    semi: 'error'
  },
  ignorePatterns: [
    'public/javascripts/*.js' /* third party stuff */,
    'scratch',
    '.eslintrc.js' /* ignore self */
  ]
};
