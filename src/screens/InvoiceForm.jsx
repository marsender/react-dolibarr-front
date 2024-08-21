import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'
import ThirdPartySelectorComponent from '../components/ThirdPartySelectorComponent'
import BankAccountSelectorComponent from '../components/BankAccountSelectorComponent'

const InvoiceForm = () => {
	const { t } = useTranslation()
	const [error, setError] = useState('')
	const [qty] = useState(1)
	const [tvaTx] = useState(0)
	const [remisePercent] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoice.create')
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		let invoiceId = 0
		const formData = new FormData(e.target)
		// Check invoice line fields
		const desc = formData.get('desc')
		const subprice = formData.get('subprice')
		const qty = formData.get('qty')
		const tvaTx = formData.get('tvaTx')
		const remisePercent = formData.get('remisePercent')
		if (!desc || !subprice) {
			setError(t('error.empty-fields'))
			return
		}
		if (parseInt(subprice) <= 0 || parseInt(qty) <= 0 || parseInt(tvaTx) < 0 || parseInt(remisePercent) < 0) {
			setError(t('error.incorrect-fields'))
			return
		}
		// Create invoice
		try {
			await api.createInvoice(formData).then((data) => {
				if (typeof data.error !== 'undefined') {
					setError(t(data.error))
					return
				}
				invoiceId = parseInt(data)
			})
		} catch (err) {
			setError(t('invoice.error'))
			console.log('Invoice create exception: %o', err)
			return
		}
		// Update invoice
		try {
			await api.updateInvoice(invoiceId, formData).then((data) => {
				if (typeof data.error !== 'undefined') {
					setError(t(data.error))
					return
				}
				console.log('Updated data: %o', data)
			})
		} catch (err) {
			setError(t('invoice.error'))
			console.log('Invoice update exception: %o', err)
			return
		}
		// Add invoice lines
		try {
			await api.addInvoiceLine(invoiceId, formData).then((data) => {
				if (typeof data.error !== 'undefined') {
					setError(t(data.error))
					return
				}
			})
		} catch (err) {
			setError(t('invoice.error'))
			console.log('Invoice create line exception: %o', err)
			return
		}
		// Validate invoice
		try {
			await api.invoiceValidate(invoiceId).then((data) => {
				if (typeof data.error !== 'undefined') {
					setError(t(data.error))
					return
				}
			})
		} catch (err) {
			setError(t('invoice.error'))
			console.log('Invoice validate exception: %o', err)
			return
		}
		navigate(`/invoice/${invoiceId}`)
	}

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('invoice.create')}</h1>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<ThirdPartySelectorComponent />
					<BankAccountSelectorComponent />
				</div>
				<div className="grid gap-6 mb-6">
					<div>
						<label htmlFor="desc" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('invoiceline.desc')}
						</label>
						<input required type="text" name="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
				</div>
				<div className="grid gap-6 mb-6 md:grid-cols-4">
					<div>
						<label htmlFor="subprice" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('invoiceline.subprice')}
						</label>
						<input required type="number" name="subprice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="qty" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('invoiceline.qty')}
						</label>
						<input required type="number" name="qty" defaultValue={qty} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="tva_tx" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('invoiceline.tva_tx')}
						</label>
						<input required type="number" name="tva_tx" defaultValue={tvaTx} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="remise_percent" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('invoiceline.remise_percent')}
						</label>
						<input required type="number" name="remise_percent" defaultValue={remisePercent} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
				</div>
				<div className="grid gap-6 mb-6">
					{error && <div className="error smallMargin-t">{error}</div>}
					<div>
						<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							{t('label.add')}
						</button>
						<Link to="/invoices" className="ml-4">
							{t('label.cancel')}
						</Link>
					</div>
				</div>
			</form>
		</>
	)
}

export default InvoiceForm
