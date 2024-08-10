// src/services/apiService.js
import axios from 'axios'
import { Invoice } from '../models/Invoice'

const api = axios.create({
	token: '',
	//baseURL: 'https://your-api-base-url.com', // replace with your API base URL
	timeout: 1000, // optional, set request timeout
	headers: {
		'Content-Type': 'application/json',
		// Add any other default headers if needed
	},
})

api.defaults.withCredentials = true
api.defaults.https = process.env.SITE_URL.search('https') > -1
api.defaults.baseURL = process.env.SITE_URL + 'api/'

api.setToken = (token) => {
	api.token = token
}
api.checkToken = () => {
	if (api.token === '') {
		throw new Error('Api token is not set')
	}
}

api.getInvoices = async () => {
	api.checkToken()
	// sqlfilters samples (t.ref:like:'FA%') (t.datec:>=:'2024-08-01')
	const date = new Date() // Get the current date
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 12)
	const sqlFilter = "(t.datec:>=:'" + firstDay.toISOString().slice(0, 10) + "')"
	// function sleep(ms) {
	// 	return new Promise((resolve) => setTimeout(resolve, ms))
	// }
	// Waits for debug
	// await sleep(3000)
	const items = await api
		.get('/invoices?sortfield=t.rowid&sortorder=DESC&sqlfilters=' + sqlFilter)
		.then((response) => {
			return response.data.map((item) => new Invoice(item))
		})
		.catch((error) => {
			console.log(error)
		})
	return items
}

api.getInvoice = async (id) => {
	api.checkToken()
	const item = await api
		.get(`/invoices/${id}`)
		.then((response) => {
			return new Invoice(response.data)
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
