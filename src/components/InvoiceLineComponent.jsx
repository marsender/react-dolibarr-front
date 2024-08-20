export default function InvoiceLineComponent(index, line) {
	return (
		<div key={index} className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
			<div className="flex-1">{line.desc}</div>
			<div className="inline-flex">{line.totalTtc}</div>
		</div>
	)
}
