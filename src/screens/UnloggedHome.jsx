import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const UnloggedHome = () => {
	const { t } = useTranslation()

	useEffect(() => {
		document.title = t('app.title')
	}, [t])

	return (
		<Link to="/login">
			<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t('label.connection')}</button>
		</Link>
	)
}

export default UnloggedHome
