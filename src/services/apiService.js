// src/services/apiService.js
import axios from 'axios'

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
