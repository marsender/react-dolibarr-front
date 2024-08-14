import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../services/apiService'

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
						<div className="flex">
							<div className="flex-1">
								<Link to={item.url}>{item.ref}</Link>
							</div>
							<div className="text-sm text-gray-900 dark:text-white">{item.dateValidation}</div>
						</div>
						{item.lines.map((line) => (
							<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
								<div className="flex-1">{line.desc}</div>
								<div className="inline-flex">{line.totalTtc}</div>
							</div>
						))}
						<div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
							<div className="flex-1"></div>
							<div className="text-gray-900 dark:text-white">{item.totalTtc} TTC</div>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default Invoices
