import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/coverage/**', '**/.turbo/**', '**/*.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.config.{ts,mts,cts,js,mjs,cjs}', 'eslint.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs['recommended-latest'].rules,
  },
  {
    files: ['apps/**/*.{ts,tsx}'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: reactRefresh.configs.vite.rules,
  },
)
