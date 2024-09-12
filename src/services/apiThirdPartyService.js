import api from './apiService'
import { ThirdParty } from '../entities/ThirdParty'

const apiThirdPartyService = {
	getThirdParties: async () => {
		if (!api.validToken()) {
			return []
		}
		const properties = ThirdParty.getApiProperties()
		const items = await api
			.get('/thirdparties?sortfield=t.nom&sortorder=ASC' + '&properties=' + properties)
			.then((result) => {
				if (!Array.isArray(result.data)) {
					console.log('Axios ThirdParties incorrect response: %o', result)
					return []
				}
				return result.data.map((item) => new ThirdParty(item))
			})
			.catch((error) => {
				throw new Error(`Axios ThirdParties error ${error.code}: ${error.message}`)
			})
		return items
	},

	getThirdParty: async (id) => {
		if (!api.validToken()) {
			throw new Error('ThirdParty: missing api token')
		}
		const item = await api
			.get(`/thirdparties/${id}`)
			.then((result) => {
				return new ThirdParty(result.data)
			})
			.catch((error) => {
				throw new Error(`Axios ThirdParty error ${error.code}: ${error.message}`)
			})
		return item
	},

	/**
	 * Get an object with third party keys associated to names
	 * eg: { 1: "Name 1", 2: "Name 2" }
	 */
	getThirdPartyNames: async () => {
		const thirdParties = await apiThirdPartyService.getThirdParties()
		const obj = thirdParties
			.map((item) => {
				return { key: item.id, value: item.name }
			})
			.reduce((obj, item) => {
				obj[item.key] = item.value
				return obj
			}, {})
		return obj
	},

	/**
	 * @see Dolibarr class htdocs/societe/class/societe.class.php
	 */
	createThirdParty: async (formData) => {
		if (!api.validToken()) {
			throw new Error('ThirdParty create: missing api token')
		}
		const name = formData.get('name')
		const email = formData.get('email')
		if (!name || !email) {
			return { error: 'error.empty-fields' }
		}
		const data = {
			name: name,
			email: email,
			phone: formData.get('phone'),
			address: formData.get('address'),
			zip: formData.get('zip'),
			town: formData.get('town'),
			client: 1, // 0=no customer, 1=customer, 2=prospect, 3=customer and prospect
			code_client: 'auto', // auto generation of code
		}
		const id = await api.post('/thirdparties', data).then(
			(result) => {
				if (result.status === 200) {
					//console.log('ThirdParty created: %o', result.data)
					return result.data
				} else {
					return ''
				}
			},
			(error) => {
				console.log(`Axios ThirdParty create error: ${error}`)
				return { error: error.code }
			}
		)
		return id
	},
}

export default apiThirdPartyService
