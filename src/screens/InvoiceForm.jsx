import React from 'react'
//import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'

const InvoiceForm = () => {
	const { t } = useTranslation()
	const [error, setError] = React.useState('')
	const navigate = useNavigate()

	React.useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoice.create')
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		// console.log(data)
		// const name = data.get('name')
		// const email = data.get('email')
		// const phone = data.get('phone')
		try {
			api.createInvoice(formData).then((data) => {
				if (typeof data.error !== 'undefined') {
					setError(t(data.error))
					return
				}
				//console.log('Create invoice with id: %s', data)
				navigate('/invoices')
			})
		} catch (err) {
			setError(t('invoice.error'))
			console.log('Invoice create exception: %o', err)
		}
	}

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('invoice.create')}</h1>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-6 mb-6">
					{error && <div className="error smallMargin-t">{error}</div>}
					<div>
						<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t('label.add')}</button>
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
