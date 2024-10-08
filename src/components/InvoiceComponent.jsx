import { Link } from 'react-router-dom'
import InvoiceLineComponent from './InvoiceLineComponent'

export default function InvoiceComponent(item, { detail }) {
	return (
		<>
			<div className="flex">
				<div className="flex-1">{detail ? item.ref : <Link to={item.url}>{item.thirdPartyName}</Link>}</div>
				<div className="text-sm text-gray-900 dark:text-white">{item.dateValidation}</div>
			</div>
			{detail && item.lines ? item.lines.map((line, index) => InvoiceLineComponent(index, line)) : null}
			<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
				<div className="flex-1">{detail ? null : item.ref}</div>
				<div className="text-gray-900 dark:text-white">{item.totalTtc} TTC</div>
			</div>
		</>
	)
}
