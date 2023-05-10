/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    // REACT
    'jsx-a11y',
    'react',
    'react-hooks',

    // JEST
    'jest',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    // General
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      },
    ],
    'prefer-const': 'error',
    curly: ['error', 'all'],
    'no-extra-boolean-cast': 'error',
    'no-debugger': 'error',
    'no-empty': 'off',

    // Typescript
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',

    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',

    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // REACT
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'static-variables',
          'instance-variables',
          'type-annotations',
          'lifecycle',
          'everything-else',
          'render',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'getDerivedStateFromError',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
        },
      },
    ],

    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',

    'react-hooks/exhaustive-deps': 'warn',

    'react-hooks/rules-of-hooks': 'error',

    // Prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        arrowParens: 'avoid',
        endOfLine: 'auto',
        tabWidth: 2,
        useTabs: false,
        bracketSameLine: false,
      },
    ],

    // JEST
    'jest/no-disabled-tests': 'warn',
    'jest/prefer-to-have-length': 'warn',

    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/assets/**',
    './scripts/**',
    '**/*.png',
    '**/*.md',
    '**/*.mov',
  ],
};
