import { render, screen } from '@testing-library/react'
import ThirdPartyComponent from '../../src/components/ThirdPartyComponent'
import { ThirdParty } from '../../src/entities/ThirdParty'
import { MemoryRouter } from 'react-router-dom'

describe('ThirdPartyComponent tests', () => {
	const entity = ThirdParty.getTestSample()
	const item = new ThirdParty(entity)

	test('check detail true', () => {
		render(<>{ThirdPartyComponent(item, { detail: true })}</>)
		//screen.debug()
		// Look for elements that must exist
		let element = null
		element = screen.getByRole('heading')
		expect(element).toBeInTheDocument()
		element = screen.getByText(entity.phone)
		expect(element).toBeInTheDocument()
		element = screen.getByText(entity.email)
		expect(element).toBeInTheDocument()
		// Look for elements that must be missing
		element = screen.queryByRole('link')
		expect(element).not.toBeInTheDocument()
		element = screen.queryByText(entity.name)
		expect(element).not.toBeInTheDocument()
	})

	test('check detail false', () => {
		render(<MemoryRouter>{ThirdPartyComponent(item, { detail: false })}</MemoryRouter>)
		let element = null
		// Look for elements that must exist
		element = screen.getByRole('link')
		expect(element).toBeInTheDocument()
		element = screen.getByText(entity.name)
		expect(element).toBeInTheDocument()
		// Look for elements that must be missing
		element = screen.queryByText(entity.phone)
		expect(element).not.toBeInTheDocument()
	})
})
