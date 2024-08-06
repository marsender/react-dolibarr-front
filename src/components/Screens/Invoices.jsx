import { useTranslation } from 'react-i18next'

const Invoices = () => {
	const { t } = useTranslation()

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
