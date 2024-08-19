import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../../src/screens/Login'
//import { I18nextProvider } from 'react-i18next'
//import i18n from '../i18nForTests'
// import i18n from '../../src/i18n'
// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'
//import thunk from 'redux-thunk'

// https://redux.js.org/usage/writing-tests
// https://www.npmjs.com/package/redux-thunk
// const mockStore = configureStore([])
// const store = mockStore({ contacts: [] })

describe('Login tests', () => {
	beforeEach(() => {
		// Mock useEffect
		React.useEffect = jest.fn()
		// Mock useState
		// const initialState = false
		// React.useState = jest.fn().mockReturnValue([initialState, {}])
		const setState = jest.fn()
		jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setState])
	})

	// afterAll(() => {
	// 	process.env = OLD_ENV // Restore old environment
	// })

	test('check content', () => {
		//console.log(process.env.SITE_URL)
		// render(
		// 	<Provider store={store}>
		// 		<I18nextProvider i18n={i18n}>
		// 			<MemoryRouter>{Login()}</MemoryRouter>
		// 		</I18nextProvider>
		// 	</Provider>
		// )
		render(<MemoryRouter>{Login()}</MemoryRouter>)
		//screen.debug()
		let element = null
		element = screen.getByRole('heading')
		expect(element).toBeInTheDocument()
	})
})
