import PropTypes from 'prop-types'

export default function InvoiceLineComponent({ line }) {
	return (
		<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
			<div className="flex-1">{line.desc}</div>
			<div className="w-24 text-right">{line.total_ht}</div>
			<div className="w-24 text-right">{line.total_ttc}</div>
		</div>
	)
}

InvoiceLineComponent.propTypes = {
	line: PropTypes.shape({
		desc: PropTypes.string.isRequired,
		total_ht: PropTypes.number.isRequired,
		total_ttc: PropTypes.number.isRequired,
	}).isRequired,
}
