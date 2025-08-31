import api from './apiService'
import { BankAccount } from '../entities/BankAccount'

const apiBankAccountService = {
	getBankAccounts: async () => {
		if (!api.validToken()) {
			return []
		}
		const properties = BankAccount.getApiProperties()
		const items = await api
			.get('/bankaccounts?sortfield=t.label&sortorder=ASC' + '&properties=' + properties)
			.then((result) => {
				if (!Array.isArray(result.data)) {
					console.log('Axios BankAccounts incorrect response: %o', result)
					return []
				}
				// The API may return IDs as strings, so we parse them to numbers.
				return result.data.map((item) => new BankAccount({ ...item, id: parseInt(item.id, 10) }))
			})
			.catch((error) => {
				throw new Error(`Axios BankAccounts error ${error.code}: ${error.message}`)
			})
		return items
	},
}

export default apiBankAccountService
