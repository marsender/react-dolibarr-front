import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Invoices = () => {
	const { t } = useTranslation()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoices.title')
	}, [])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('invoices.title')}</h1>
			<ul>
				<li>Invoices Todo</li>
			</ul>
		</>
	)
}

export default Invoices
