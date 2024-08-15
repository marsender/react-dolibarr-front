const config = {
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['./jest-setup.js'],
}
module.exports = config
