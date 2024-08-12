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
			<ul>
				{invoices.map((item) => (
					<li key={item.id}>
						<Link to={item.url}>REF: {item.ref}</Link> - {item.dateValidation} - Total HT: {item.totalHt} - Total TTC: {item.totalTtc}
					</li>
				))}
			</ul>
		</>
	)
}

export default Invoices
