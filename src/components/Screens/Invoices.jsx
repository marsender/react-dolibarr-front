import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const Invoices = () => {
	const { t } = useTranslation()
	const [invoices, setInvoices] = useState([])

	const getInvoices = () => {
		axios
			.get('/invoices?sortfield=t.rowid&sortorder=DESC&limit=10')
			.then((response) => {
				const items = response.data.map(function (item) {
					let date = new Date(item.date_validation * 1000)
					return {
						id: item.id,
						ref: item.ref,
						dateValidation: date.toDateString(),
						totalHt: item.total_ht,
						totalTtc: item.total_ttc,
					}
				})
				setInvoices(items)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoices.title')
		getInvoices()
	}, [])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('invoices.title')}</h1>
			<ul>
				{invoices.map((item) => (
					<li key={item.id}>
						ID: {item.id} - REF: {item.ref} - Date: {item.dateValidation} - Total HT: {item.totalHt}
					</li>
				))}
			</ul>
		</>
	)
}

export default Invoices
