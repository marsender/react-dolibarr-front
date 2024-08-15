// src/services/apiService.js
import axios from 'axios'
import { Invoice } from '../entities/Invoice'
import { ThirdParty } from '../entities/ThirdParty'

const api = axios.create({
	token: '',
	//baseURL: 'https://your-api-base-url.com', // replace with your API base URL
	timeout: 1000, // optional, set request timeout
	headers: {
		'Content-Type': 'application/json',
		// Add any other default headers if needed
	},
})

// Api base url is SITE_URL/api to avoid CORS errors
// and the server proxy will redirect to API_URL target
api.defaults.https = process.env.SITE_URL.search('https') > -1
api.defaults.baseURL = process.env.SITE_URL + 'api/'
api.defaults.withCredentials = true

api.setToken = (token) => {
	api.token = token
}

api.validToken = () => (api.token === '' ? false : true)

api.login = async (username, password) => {
	const token = await api
		.post('login', {
			login: username,
			password: password,
		})
		.then(
			(result) => {
				if (result.status === 200) {
					//console.log('Login ok with token: %s', result.data.success.token)
					return result.data.success.token
				} else {
					return ''
				}
			},
			(error) => {
				throw new Error(`Login error: ${error}`)
			}
		)
	return token
}

api.getInvoices = async () => {
	if (!api.validToken()) {
		return []
	}
	// sqlfilters samples (t.ref:like:'FA%') (t.datec:>=:'2024-08-01')
	const date = new Date() // Get the current date
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 12)
	const sqlFilter = "(t.datec:>=:'" + firstDay.toISOString().slice(0, 10) + "')"
	const properties = Invoice.getApiProperties()
	// function sleep(ms) {
	// 	return new Promise((resolve) => setTimeout(resolve, ms))
	// }
	// Waits for debug
	// await sleep(3000)
	const items = await api
		.get('/invoices?sortfield=t.rowid&sortorder=DESC' + '&sqlfilters=' + sqlFilter + '&properties=' + properties)
		.then((response) => {
			return response.data.map((item) => new Invoice(item))
		})
		.catch((error) => {
			console.log(error)
		})
	// Fetch third party for each invoice
	await Promise.all(
		items.map(async (item) => {
			const thirdParty = await api.getThirdParty(item.socid)
			item.setThirdParty(thirdParty)
		})
	)
	return items
}

api.getInvoice = async (id) => {
	if (!api.validToken()) {
		throw new Error('Invoice: missing api token')
	}
	const item = await api
		.get(`/invoices/${id}`)
		.then((response) => {
			let item = new Invoice(response.data)
			return item
		})
		.catch((error) => {
			console.log(error)
		})
	const thirdParty = await api.getThirdParty(item.socid)
	item.setThirdParty(thirdParty)
	return item
}

api.getThirdParties = async () => {
	if (!api.validToken()) {
		return []
	}
	const properties = ThirdParty.getApiProperties()
	const items = await api
		.get('/thirdparties?sortfield=t.nom&sortorder=ASC' + '&properties=' + properties)
		.then((response) => {
			return response.data.map((item) => new ThirdParty(item))
		})
		.catch((error) => {
			console.log(error)
		})
	return items
}

api.getThirdParty = async (id) => {
	if (!api.validToken()) {
		throw new Error('ThirdParty: missing api token')
	}
	const item = await api
		.get(`/thirdparties/${id}`)
		.then((response) => {
			return new ThirdParty(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	return item
}

// Example of adding an interceptor
api.interceptors.request.use(
	(config) => {
		// Modify config if needed, e.g., add authorization token
		config.headers['DOLAPIKEY'] = api.token
		return config
	},
	(error) => Promise.reject(error)
)

// api.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// );

export default api
