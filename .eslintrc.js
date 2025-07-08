module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: [
    'node_modules/**/*',
    '**/node_modules/**/*',
    '*.min.js',
    'dist/**/*',
    'build/**/*',
    '**/node_modules/**/*.js',
    '**/node_modules/**/*.jsx'
  ],
  rules: {
    // Disable strict TypeScript rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    
    // React rules
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.ts', '.jsx', '.js'] }],
    'react-hooks/exhaustive-deps': 'warn',
    
    // General rules
    'no-unused-vars': 'off', // Use TypeScript version instead
    'radix': 'warn',
  },
  overrides: [
    {
      // Apply stricter TypeScript rules only to TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-shadow': 'warn',
      },
    },
    {
      // Ignore TypeScript rules for JavaScript files in node_modules
      files: ['**/node_modules/**/*.js', '**/node_modules/**/*.jsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-shadow': 'off',
      },
    },
  ],
};
