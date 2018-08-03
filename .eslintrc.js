module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-no-bind': 0,
    'comma-dangle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'jsx-a11y/img-has-alt': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-unused-vars': ['error', { varsIgnorePattern: '_' }],
  },
  globals: {
    before: true,
    Blob: true,
    document: true,
    window: true,
    atob: true,
    fetch: true,
    localStorage: true,
    it: true,
    describe: true,
    expect: true,
    jest: true,
    beforeEach: true,
    afterEach: true,
    XMLHttpRequest: true
  },
  settings: {
    'import/core-modules': ['app', 'reducers']
  }
};
