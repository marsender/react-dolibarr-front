/** @type {import('jest').Config} */
const config = {
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	// https://jestjs.io/docs/configuration#setupfilesafterenv-array
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	// https://jestjs.io/docs/configuration#setupfiles-array
	setupFiles: ['<rootDir>/jest-env.js'],
}
module.exports = config
