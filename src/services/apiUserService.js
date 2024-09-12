import api from './apiService'
import { User } from '../entities/User'

const apiUserService = {
	getUsers: async (username = null) => {
		if (!api.validToken()) {
			return []
		}
		const sqlFilter = username ? "&sqlfilters=(t.login:=:'" + username + "')" : ''
		const properties = User.getApiProperties()
		const items = await api
			.get('/users?sortfield=t.firstname,t.lastname&sortorder=ASC' + sqlFilter + '&properties=' + properties)
			.then((result) => {
				if (!Array.isArray(result.data)) {
					console.log('Axios Users incorrect response: %o', result)
					return []
				}
				return result.data.map((item) => new User(item))
			})
			.catch((error) => {
				throw new Error(`Axios Users error ${error.code}: ${error.message}`)
			})
		return items
	},
}

export default apiUserService
