import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '../../src/screens/Login'
import { MemoryRouter } from 'react-router-dom'

describe('Login tests', () => {
	beforeEach(() => {
		// Mock useEffect
		React.useEffect = jest.fn()
		const setState = jest.fn()
		jest.spyOn(React, 'useState').mockImplementationOnce((initState) => [initState, setState])
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	test('check content', () => {
		render(<MemoryRouter>{Login()}</MemoryRouter>)
		let element = null
		element = screen.getByRole('heading')
		expect(element).toBeInTheDocument()
		expect(React.useEffect).toHaveBeenCalled()
		expect(React.useState).toHaveBeenCalled()
	})
})
