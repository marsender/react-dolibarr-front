import React from 'react'
//import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'

const ThirdPartyForm = () => {
	const { t } = useTranslation()
	const [error, setError] = React.useState('')
	const navigate = useNavigate()

	React.useEffect(() => {
		document.title = t('app.title') + ' - ' + t('thirdparty.create')
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		// console.log(data)
		// const name = data.get('name')
		// const email = data.get('email')
		// const phone = data.get('phone')
		try {
			api.createThirdParty(formData).then((data) => {
				if (typeof data.error !== 'undefined') {
					setError(t(data.error))
					return
				}
				console.log('Create thirdparty with id: %s', data)
				navigate('/thirdparties')
			})
		} catch (err) {
			setError(t('thirdparty.error'))
			console.log('ThirdParty create exception: %o', err)
		}
	}

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('thirdparty.create')}</h1>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-6">
					<div>
						<label htmlFor="name" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('thirdparty.name')}
						</label>
						<input required type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="email" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('thirdparty.email')}
						</label>
						<input required name="email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('thirdparty.phone')}
						</label>
						<input type="text" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('thirdparty.address')}
						</label>
						<input type="text" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('thirdparty.zip')}
						</label>
						<input type="text" name="zip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					<div>
						<label htmlFor="town" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t('thirdparty.town')}
						</label>
						<input type="text" name="town" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
					</div>
					{error && <div className="error smallMargin-t">{error}</div>}
					<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t('label.add')}</button>
						<Link to="/thirdparties" className="ml-4">
							{t('label.cancel')}
						</Link>
					</div>
				</div>
			</form>
		</>
	)
}

export default ThirdPartyForm
