import React from 'react'
import { render, screen } from '@testing-library/react'
import ThirdPartyComponent from '../../src/components/ThirdPartyComponent'
import { ThirdParty } from '../../src/entities/ThirdParty'

describe('ThirdPartyComponent tests', () => {
	test('should render a heading', () => {
		const entity = ThirdParty.getTestSample()
		const item = new ThirdParty(entity)
		render(<>{ThirdPartyComponent(item, { detail: true })}</>)
		const element = screen.getByRole('heading')
		expect(element).toBeInTheDocument()
	})
})
