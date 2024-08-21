import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'

function BankAccountSelectorComponent() {
	const { t } = useTranslation()
	const [bankAccounts, setBankAccounts] = useState([])
	const [selectedBankAccount, setSelectedBankAccount] = useState('')

	useEffect(() => {
		api.getBankAccounts().then((response) => {
			const bankAccounts = response.map((item) => {
				return { id: item.id, value: item.label }
			})
			setBankAccounts(bankAccounts)
		})
	}, [t])

	const handleChange = (event) => {
		const selectedId = event.target.value
		setSelectedBankAccount(selectedId)
	}

	return (
		<div>
			<label htmlFor="fk_account" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{t('bankaccount.title')}
			</label>
			<select required name="fk_account" value={selectedBankAccount} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="" disabled>
					{t('bankaccount.select')}
				</option>
				{bankAccounts.map((item) => (
					<option key={item.id} value={item.id}>
						{item.value}
					</option>
				))}
			</select>
		</div>
	)
}

export default BankAccountSelectorComponent
