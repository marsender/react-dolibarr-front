// src/services/apiService.js
import axios from 'axios'
import { User } from '../entities/User'
import { Document } from '../entities/Document'
import { Download } from '../entities/Download'
import { BankAccount } from '../entities/BankAccount'

const api = axios.create({
	token: '',
	//baseURL: 'https://your-api-base-url.com', // replace with your API base URL
	timeout: 30000, // optional, set request timeout in ms
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

/**
 * Wait function to test promise
 *
 * Usage: await api.sleepTest(3000)
 *
 * @param {number} ms Number of milliseconds to wait
 */
api.sleepTest = async (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

api.getDocuments = async (module, ref) => {
	if (!api.validToken()) {
		throw new Error('Documents: missing api token')
	}
	const items = await api
		.get(`/documents?modulepart=${module}&ref=${ref}`)
		.then((result) => {
			if (!Array.isArray(result.data)) {
				console.log('Axios Documents incorrect response: %o', result)
				return []
			}
			return result.data.map((item) => new Document(item))
		})
		.catch((error) => {
			throw new Error(`Axios Documents module error ${error.code}: ${error.message}`)
		})
	return items
}

api.getDocumentDownload = async (module, path) => {
	if (!api.validToken()) {
		throw new Error('Document: missing api token')
	}
	const item = await api
		.get(`documents/download?modulepart=${module}&original_file=/${path}`)
		.then((result) => {
			return new Download(result.data)
		})
		.catch((error) => {
			throw new Error(`Axios Document download error ${error.code}: ${error.message}`)
		})
	return item
}

api.getBankAccounts = async () => {
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
			return result.data.map((item) => new BankAccount(item))
		})
		.catch((error) => {
			throw new Error(`Axios BankAccounts error ${error.code}: ${error.message}`)
		})
	return items
}

api.getUsers = async (username = null) => {
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
}

// Add interceptor to set dynamic header
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
