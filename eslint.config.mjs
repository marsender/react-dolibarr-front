import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
	globalIgnores(['dist']),
	js.configs.recommended,
	reactHooks.configs.flat['recommended-latest'],
	reactRefresh.configs.vite,
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				process: 'readonly',
			},
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		rules: {
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
		},
	},
	{
		files: ['**/*.test.{js,jsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
			},
		},
	},
	{
		files: ['jest-*.js'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
	},
	{
		files: ['jest-env.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
])
