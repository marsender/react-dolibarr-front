import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'
import InvoiceComponent from '../components/InvoiceComponent'
import DownloadComponent from '../components/DownloadComponent'
import ReturnButtonComponent from '../components/ReturnButtonComponent'

const Invoice = () => {
	const { t } = useTranslation()
	const [invoice, setInvoice] = useState([])

	const { id } = useParams()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoice.title')
		api.getInvoice(id).then((response) => {
			if (response) {
				setInvoice(response)
			}
		})
	}, [id, t])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				{t('invoice.title')} - {invoice.thirdPartyName}
			</h1>
			{InvoiceComponent(invoice, { detail: true })}
			<div className="mt-4 flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
				<ReturnButtonComponent link="/invoices" />
				<DownloadComponent module="invoice" documentRef={invoice.ref} />
			</div>
		</>
	)
}

export default Invoice
