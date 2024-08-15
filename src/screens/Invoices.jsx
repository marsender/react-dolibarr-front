import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'
import InvoiceComponent from '../components/InvoiceComponent'

const Invoices = () => {
	const { t } = useTranslation()
	const [invoices, setInvoices] = useState([])

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoices.title')
		api.getInvoices().then((response) => {
			setInvoices(response)
		})
	}, [])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('invoices.title')}</h1>
			<ul className="divide-y divide-gray-200 dark:divide-gray-700">
				{invoices.map((item) => (
					<li key={item.id} className="py-3 sm:py-4">
						{InvoiceComponent(item, { detail: false })}
					</li>
				))}
			</ul>
		</>
	)
}

export default Invoices
