import PropTypes from 'prop-types'

export default function InvoiceLineComponent({ line }) {
	return (
		<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
			<div className="flex-1">{line.desc}</div>
			<div className="w-24 text-right">{line.totalHt}</div>
			<div className="w-24 text-right">{line.totalTtc}</div>
		</div>
	)
}

InvoiceLineComponent.propTypes = {
	line: PropTypes.shape({
		desc: PropTypes.string.isRequired,
		totalHt: PropTypes.string.isRequired,
		totalTtc: PropTypes.string.isRequired,
	}).isRequired,
}
