import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import apiInvoiceService from '../services/apiInvoiceService'
import InvoiceComponent from '../components/InvoiceComponent'

const Invoices = () => {
	const { t } = useTranslation()
	const [invoices, setInvoices] = useState([])

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoices.title')
		apiInvoiceService.getInvoices().then((response) => {
			setInvoices(response)
		})
	}, [t])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				{t('invoices.title')}
				<Link to="/invoice/add">
					<button className="ml-4 px-3 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						{t('label.add')}
						<span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">+</span>
					</button>
				</Link>
			</h1>
			<ul className="divide-y divide-gray-200 dark:divide-gray-700">
				{invoices ? (
					invoices.map((item) => (
						<li key={item.id} className="py-3 sm:py-4">
							{InvoiceComponent(item, { detail: false })}
						</li>
					))
				) : (
					<p>{t('label.loading')}</p>
				)}
			</ul>
		</>
	)
}

export default Invoices
