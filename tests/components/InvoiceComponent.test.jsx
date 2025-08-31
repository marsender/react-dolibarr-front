import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InvoiceComponent from '../../src/components/InvoiceComponent'
import InvoiceLineComponent from '../../src/components/InvoiceLineComponent'

// Mock the child component to isolate the InvoiceComponent logic
jest.mock('../../src/components/InvoiceLineComponent', () => {
	return {
		__esModule: true,
		default: jest.fn(({ line }) => <div data-testid="invoice-line">Mocked Line: {line.id}</div>),
	}
})

describe('InvoiceComponent tests', () => {
	const sampleInvoice = {
		id: 1,
		ref: 'FA23-0001',
		url: '/invoices/1',
		thirdPartyName: 'Test Customer',
		dateValidation: '2023-10-27',
		totalHt: 100.0,
		totalTtc: 120.0,
		lines: [
			{ id: 10, description: 'Product A' },
			{ id: 11, description: 'Service B' },
		],
	}

	beforeEach(() => {
		// Clear mock history before each test
		InvoiceLineComponent.mockClear()
	})

	test('renders in list mode (detail=false)', () => {
		render(
			<MemoryRouter>
				<InvoiceComponent invoice={sampleInvoice} detail={false} />
			</MemoryRouter>
		)

		// Check for elements that should exist in list mode
		const link = screen.getByRole('link', { name: sampleInvoice.thirdPartyName })
		expect(link).toBeInTheDocument()
		expect(link).toHaveAttribute('href', sampleInvoice.url)

		expect(screen.getByText(sampleInvoice.dateValidation)).toBeInTheDocument()
		expect(screen.getByText(sampleInvoice.ref)).toBeInTheDocument()
		expect(screen.getByText(`${sampleInvoice.totalHt} HT`)).toBeInTheDocument()
		expect(screen.getByText(`${sampleInvoice.totalTtc} TTC`)).toBeInTheDocument()

		// Invoice lines should not be rendered in list mode
		expect(InvoiceLineComponent).not.toHaveBeenCalled()
	})

	test('renders in detail mode (detail=true)', () => {
		render(
			<MemoryRouter>
				<InvoiceComponent invoice={sampleInvoice} detail={true} />
			</MemoryRouter>
		)

		// Check for elements that should exist in detail mode
		expect(screen.getByText(sampleInvoice.ref)).toBeInTheDocument()
		expect(screen.getByText(sampleInvoice.dateValidation)).toBeInTheDocument()
		expect(screen.getByText(`${sampleInvoice.totalHt} HT`)).toBeInTheDocument()
		expect(screen.getByText(`${sampleInvoice.totalTtc} TTC`)).toBeInTheDocument()

		// Check that InvoiceLineComponent was called for each line
		expect(InvoiceLineComponent).toHaveBeenCalledTimes(sampleInvoice.lines.length)
		expect(InvoiceLineComponent).toHaveBeenCalledWith(expect.objectContaining({ line: sampleInvoice.lines[0] }), {})
		expect(InvoiceLineComponent).toHaveBeenCalledWith(expect.objectContaining({ line: sampleInvoice.lines[1] }), {})
		expect(screen.getAllByTestId('invoice-line')).toHaveLength(2)

		// Link and third party name should not be rendered in detail mode
		expect(screen.queryByRole('link')).not.toBeInTheDocument()
		expect(screen.queryByText(sampleInvoice.thirdPartyName)).not.toBeInTheDocument()
	})

	test('renders correctly when invoice has no lines in detail mode', () => {
		const invoiceWithoutLines = { ...sampleInvoice, lines: [] }
		render(
			<MemoryRouter>
				<InvoiceComponent invoice={invoiceWithoutLines} detail={true} />
			</MemoryRouter>
		)

		// Check that InvoiceLineComponent was not called
		expect(InvoiceLineComponent).not.toHaveBeenCalled()
		expect(screen.queryByTestId('invoice-line')).not.toBeInTheDocument()
	})
})
