import { Link } from 'react-router-dom'
import InvoiceLineComponent from './InvoiceLineComponent'

export default function InvoiceComponent({ invoice, detail }) {
	return (
		<>
			<div className="flex">
				<div className="flex-1">{detail ? invoice.ref : <Link to={invoice.url}>{invoice.thirdPartyName}</Link>}</div>
				<div className="text-sm text-gray-900 dark:text-white">{invoice.dateValidation}</div>
			</div>
			{detail && invoice.lines ? invoice.lines.map((line) => <InvoiceLineComponent key={line.id} line={line} />) : null}
			<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
				<div className="flex-1">{detail ? null : invoice.ref}</div>
				<div className="w-24 text-right">{invoice.totalHt} HT</div>
				<div className="w-24 text-right text-gray-900 dark:text-white">{invoice.totalTtc} TTC</div>
			</div>
		</>
	)
}
