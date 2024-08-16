import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'

const InvoiceForm = () => {
	const { t } = useTranslation()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('invoice.create')
	})

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('invoice.create')}</h1>
			<p>Todo</p>
		</>
	)
}

export default InvoiceForm
