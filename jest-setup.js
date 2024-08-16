import '@testing-library/jest-dom'

// jest.mock('react', () => ({
// 	...jest.requireActual('react'),
// 	useState: jest.fn(),
// }))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
}))

// https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
	useTranslation: () => {
		return {
			t: (str) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		}
	},
	initReactI18next: {
		type: '3rdParty',
		init: () => {},
	},
}))

jest.mock('react-redux', () => ({
	useSelector: jest.fn(),
	useDispatch: () => jest.fn(),
}))
