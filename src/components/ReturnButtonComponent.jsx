import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ReturnButtonComponent({ link }) {
	const { t } = useTranslation()

	return (
		<Link to={link}>
			<button className="mt-4 px-3 py-2 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
				</svg>
				{t('label.return')}
			</button>
		</Link>
	)
}

ReturnButtonComponent.propTypes = {
	link: PropTypes.string,
}

export default ReturnButtonComponent
