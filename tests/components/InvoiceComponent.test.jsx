import { render, screen } from '@testing-library/react'
import InvoiceComponent from '../../src/components/InvoiceComponent'
import InvoiceLineComponent from '../../src/components/InvoiceLineComponent'
import InvoiceStatusComponent from '../../src/components/InvoiceStatusComponent'
import { MemoryRouter } from 'react-router-dom'

// Mock the child component to isolate the InvoiceComponent logic
jest.mock('../../src/components/InvoiceLineComponent', () => {
	return {
		__esModule: true,
		default: jest.fn(({ line }) => <div data-testid="invoice-line">Mocked Line: {line.id}</div>),
	}
})
jest.mock('../../src/components/InvoiceStatusComponent', () => {
	return {
		__esModule: true,
		default: jest.fn(({ status }) => <div data-testid="invoice-status">Mocked Status: {status}</div>),
	}
})

describe('InvoiceComponent tests', () => {
	const sampleInvoice = {
		id: 1,
		status: 1,
		ref: 'FA23-0001',
		url: '/invoices/1',
		thirdPartyName: 'Test Customer',
		dateValidation: '2023-10-27',
		ht: 100.0,
		ttc: 120.0,
		totalHt: '100.00',
		totalTtc: '120.00',
		lines: [
			{ id: 10, desc: 'Product A', total_ht: 50.0, total_ttc: 60.0, totalHt: '50 €', totalTtc: '60 €' },
			{ id: 11, desc: 'Service B', total_ht: 100.0, total_ttc: 120.0, totalHt: '100 €', totalTtc: '120 €' },
		],
	}

	beforeEach(() => {
		// Clear mock history before each test
		InvoiceLineComponent.mockClear()
		InvoiceStatusComponent.mockClear()
	})

	test('renders in list mode (detail=false)', () => {
		render(
			<MemoryRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
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

		// Check that InvoiceStatusComponent was called with the correct status
		expect(InvoiceStatusComponent).toHaveBeenCalledWith(expect.objectContaining({ status: sampleInvoice.status }), undefined)

		// Invoice lines should not be rendered in list mode
		expect(InvoiceLineComponent).not.toHaveBeenCalled()
	})

	test('renders in detail mode (detail=true)', () => {
		render(
			<MemoryRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<InvoiceComponent invoice={sampleInvoice} detail={true} />
			</MemoryRouter>
		)

		// Check for elements that should exist in detail mode
		expect(screen.getByText(sampleInvoice.ref)).toBeInTheDocument()
		expect(screen.getByText(sampleInvoice.dateValidation)).toBeInTheDocument()
		expect(screen.getByText(`${sampleInvoice.totalHt} HT`)).toBeInTheDocument()
		expect(screen.getByText(`${sampleInvoice.totalTtc} TTC`)).toBeInTheDocument()

		// Check that InvoiceStatusComponent was called with the correct status
		expect(InvoiceStatusComponent).toHaveBeenCalledWith(expect.objectContaining({ status: sampleInvoice.status }), undefined)

		// Check that InvoiceLineComponent was called for each line
		expect(InvoiceLineComponent).toHaveBeenCalledTimes(sampleInvoice.lines.length)

		expect(screen.getAllByTestId('invoice-line')).toHaveLength(2)

		// Link and third party name should not be rendered in detail mode
		expect(screen.queryByRole('link')).not.toBeInTheDocument()
		expect(screen.queryByText(sampleInvoice.thirdPartyName)).not.toBeInTheDocument()
	})

	test('renders correctly when invoice has empty lines array in detail mode', () => {
		const invoiceWithoutLines = { ...sampleInvoice, lines: [] }
		render(
			<MemoryRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<InvoiceComponent invoice={invoiceWithoutLines} detail={true} />
			</MemoryRouter>
		)

		// Check that InvoiceLineComponent was not called
		expect(InvoiceLineComponent).not.toHaveBeenCalled()

		expect(screen.queryByTestId('invoice-line')).not.toBeInTheDocument()
	})

	test('renders correctly when invoice has no lines property in detail mode', () => {
		const invoiceWithoutLines = { ...sampleInvoice, lines: undefined }
		render(
			<MemoryRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<InvoiceComponent invoice={invoiceWithoutLines} detail={true} />
			</MemoryRouter>
		)

		// Check that InvoiceLineComponent was not called
		expect(InvoiceLineComponent).not.toHaveBeenCalled()

		expect(screen.queryByTestId('invoice-line')).not.toBeInTheDocument()
	})
})
