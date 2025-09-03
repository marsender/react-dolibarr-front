import { render, screen } from '@testing-library/react'
import ThirdPartyComponent from '../../src/components/ThirdPartyComponent'
import { ThirdParty } from '../../src/entities/ThirdParty'
import { MemoryRouter } from 'react-router-dom'

describe('ThirdPartyComponent tests', () => {
	const entity = ThirdParty.getTestSample()
	const item = new ThirdParty(entity)

	test('check detail true', () => {
		render(<ThirdPartyComponent thirdParty={item} detail={true} />)

		// Look for elements that must exist
		expect(screen.getByRole('heading')).toBeInTheDocument()
		expect(screen.getByText(entity.phone)).toBeInTheDocument()
		expect(screen.getByText(entity.email)).toBeInTheDocument()

		// Look for elements that must be missing
		expect(screen.queryByRole('link')).not.toBeInTheDocument()
		// The name is part of the heading, so we should check for its absence as a standalone element if needed.
		// In detail view, the name is the heading, so we don't check for its absence.
	})

	test('check detail false', () => {
		render(
			<MemoryRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<ThirdPartyComponent thirdParty={item} detail={false} />
			</MemoryRouter>
		)

		// Look for elements that must exist
		expect(screen.getByRole('link', { name: entity.name })).toBeInTheDocument()

		// Look for elements that must be missing
		expect(screen.queryByText(entity.phone)).not.toBeInTheDocument()
	})
})
