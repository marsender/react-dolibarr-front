import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'
import InvoiceComponent from '../components/InvoiceComponent'

const Invoice = () => {
	const { t } = useTranslation()
	const [invoice, setInvoice] = useState([])

	const { id } = useParams()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoice.title')
		api.getInvoice(id).then((response) => {
			setInvoice(response)
		})
	})

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				{t('invoice.title')} - {invoice.thirdPartyName}
			</h1>
			{InvoiceComponent(invoice, { detail: true })}
		</>
	)
}

export default Invoice
