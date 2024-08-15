import { Link } from 'react-router-dom'

export default function InvoiceComponent(item, { displayLines }) {
	return (
		<>
			<div className="flex">
				<div className="flex-1">
					<Link to={item.url}>{displayLines ? item.ref : item.thirdPartyName}</Link>
				</div>
				<div className="text-sm text-gray-900 dark:text-white">{item.dateValidation}</div>
			</div>
			{displayLines && item.lines
				? item.lines.map((line, index) => (
						<div key={index} className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
							<div className="flex-1">{line.desc}</div>
							<div className="inline-flex">{line.totalTtc}</div>
						</div>
				  ))
				: null}
			<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
				<div className="flex-1">{displayLines ? null : item.ref}</div>
				<div className="text-gray-900 dark:text-white">{item.totalTtc} TTC</div>
			</div>
		</>
	)
}
