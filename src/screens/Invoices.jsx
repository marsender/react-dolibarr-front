import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import apiInvoiceService from '../services/apiInvoiceService'
import InvoiceComponent from '../components/InvoiceComponent'

const Invoices = () => {
	const { t } = useTranslation()
	const [invoices, setInvoices] = useState([])
	const [dateFilter, setDateFilter] = useState('year') // 'year' or 'month'
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoices.title')
		setLoading(true)
		apiInvoiceService.getInvoices(dateFilter).then((response) => {
			setInvoices(response)
			setLoading(false)
		})
	}, [t, dateFilter])

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
			<h1 className="flex items-center my-4 text-2xl font-semibold">
				{t('invoices.title')}
				<Link to="/invoice/add">
					<button className="ml-4 px-3 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						{t('label.add')}
						<span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">+</span>
					</button>
				</Link>
			</h1>
			<div className="flex justify-end mb-4">
				<div className="inline-flex rounded-md shadow-sm" role="group">
					<button
						type="button"
						onClick={() => setDateFilter('month')}
						className={`px-4 py-2 text-sm font-medium ${dateFilter === 'month' ? 'text-blue-700 bg-blue-50 dark:bg-gray-700 dark:text-white' : 'text-gray-900 bg-white dark:text-white dark:bg-gray-800'} border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
					>
						{t('label.month', 'Month')}
					</button>
					<button
						type="button"
						onClick={() => setDateFilter('year')}
						className={`px-4 py-2 text-sm font-medium ${dateFilter === 'year' ? 'text-blue-700 bg-blue-50 dark:bg-gray-700 dark:text-white' : 'text-gray-900 bg-white dark:text-white dark:bg-gray-800'} border-t border-b border-r border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}
					>
						{t('label.year', 'Year')}
					</button>
				</div>
			</div>
			<ul className="divide-y divide-gray-200 dark:divide-gray-700">
				{loading ? (
					<p>{t('label.loading')}</p>
				) : (
					invoices.map((item) => (
						<li key={item.id} className="py-3 sm:py-4">
							<InvoiceComponent invoice={item} detail={false} />
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
