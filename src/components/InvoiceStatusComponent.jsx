import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const InvoiceStatusComponent = ({ status }) => {
	const { t } = useTranslation()

	const getStatusText = (status) => {
		switch (status) {
			case 0:
				return t('invoice.status.draft', 'Draft')
			case 1:
				return t('invoice.status.validated', 'Validated')
			case 2:
				return t('invoice.status.closed', 'Closed')
			case 3:
				return t('invoice.status.abandoned', 'Abandoned')
			default:
				return `${t('invoice.status.unknown', 'Unknown')} ${status}`
		}
	}

	const getStatusClass = (status) => {
		switch (status) {
			case 0: // draft
				return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
			case 1: // validated
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
			case 2: // closed (paid)
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
			case 3: // abandoned
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
		}
	}

	return <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusClass(status)}`}>{getStatusText(status)}</span>
}

InvoiceStatusComponent.propTypes = {
	status: PropTypes.number.isRequired,
}

export default InvoiceStatusComponent
