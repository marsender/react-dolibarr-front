import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const LoggedHome = () => {
	const { t } = useTranslation()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('home.title')
	})

	return (
		<>
			<h1 className="my-4 text-2xl font-semibold">{t('home.title')}</h1>
			<ul>
				<li>
					<Link to="/invoices">{t('invoices.title')}</Link>
				</li>
				<li>
					<Link to="/thirdparties">{t('thirdparties.title')}</Link>
				</li>
			</ul>
		</>
	)
}

export default LoggedHome
