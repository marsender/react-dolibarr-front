import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Invoice } from '../../models/Invoice'

const Invoices = () => {
	const { t } = useTranslation()
	const [invoices, setInvoices] = useState([])

	const getInvoices = () => {
		// sqlfilters samples (t.ref:like:'FA%') (t.datec:>=:'2024-08-01')
		const date = new Date() // Get the current date
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 12)
		const sqlFilter = "(t.datec:>=:'" + firstDay.toISOString().slice(0, 10) + "')"
		axios
			.get('/invoices?sortfield=t.rowid&sortorder=DESC&sqlfilters=' + sqlFilter)
			.then((response) => {
				const items = response.data.map((item) => new Invoice(item))
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
						ID: {item.id} - REF: {item.ref} - {item.dateValidation} - Total HT: {item.totalHt} - Total TTC: {item.totalTtc}
					</li>
				))}
			</ul>
		</>
	)
}

export default Invoices
