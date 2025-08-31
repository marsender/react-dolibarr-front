import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import apiInvoiceService from '../services/apiInvoiceService'
import InvoiceComponent from '../components/InvoiceComponent'

const Invoices = () => {
	const { t } = useTranslation()
	const [invoices, setInvoices] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoices.title')
		apiInvoiceService.getInvoices().then((response) => {
			setInvoices(response)
			setLoading(false)
		})
	}, [t])

	const totals = useMemo(() => {
		if (!invoices || invoices.length === 0) {
			return { count: 0, ht: 0, ttc: 0 }
		}
		const totalHt = invoices.reduce((sum, invoice) => sum + invoice.ht, 0)
		const totalTtc = invoices.reduce((sum, invoice) => sum + invoice.ttc, 0)
		return {
			count: invoices.length,
			ht: totalHt,
			ttc: totalTtc,
		}
	}, [invoices])

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
	const numberFormatter = new Intl.NumberFormat(process.env.LOCALE, {
		style: 'decimal', // Other options: 'currency', 'percent', etc.
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})

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
				{loading ? (
					<p>{t('label.loading')}</p>
				) : (
					invoices.map((item) => (
						<li key={item.id} className="py-3 sm:py-4">
							{InvoiceComponent(item, { detail: false })}
						</li>
					))
				)}
			</ul>
			{totals.count > 0 && (
				<footer className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
					<div className="flex justify-between text-base font-semibold">
						<span>
							{t('invoices.count')}: {totals.count}
						</span>
						<span>
							{t('invoices.total_ht')}: {numberFormatter.format(totals.ht) + ' ' + process.env.CURRENCY}
						</span>
						<span>
							{t('invoices.total_ttc')}: {numberFormatter.format(totals.ttc) + ' ' + process.env.CURRENCY}
						</span>
					</div>
				</footer>
			)}
		</>
	)
}

export default Invoices
