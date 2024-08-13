import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../services/apiService'

const Invoice = () => {
	const { t } = useTranslation()
	const [invoice, setInvoice] = useState([])

	const { id } = useParams()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoice.title')
		api.getInvoice(id).then((response) => {
			setInvoice(response)
		})
	}, [])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				{t('invoice.title')} - {invoice.ref}
			</h1>
			<div className="flex flex-wrap">
				<h1 className="flex-auto text-lg font-semibold">{invoice.dateValidation}</h1>
				<div className="text-lg font-semibold text-slate-500">{invoice.totalTtc} TTC</div>
			</div>
		</>
	)
}

export default Invoice
