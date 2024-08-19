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
		.post('/login', {
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
				throw new Error(`Axios Login error: ${error}`)
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
			if (!Array.isArray(response.data)) {
				console.log('Axios Invoices incorrect response: %o', response)
				return []
			}
			return response.data.map((item) => new Invoice(item))
		})
		.catch((error) => {
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios Invoices error %s: %s', error.code, error.message)
				throw new Error(`Axios Invoices error ${error.code}: ${error.message}`)
			}
			return []
		})
	// Fetch third party for each invoice
	await Promise.all(
		items.map(async (item) => {
			const thirdParty = await api.getThirdParty(item.socid)
			if (thirdParty) {
				item.setThirdParty(thirdParty)
			}
		})
	)
	return items
}

api.getInvoice = async (id) => {
	if (!api.validToken()) {
		throw new Error('Axios Invoice: missing api token')
	}
	const item = await api
		.get(`/invoices/${id}`)
		.then((response) => {
			let item = new Invoice(response.data)
			return item
		})
		.catch((error) => {
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios Invoice error %s: %s', error.code, error.message)
				throw new Error(`Axios Invoice error ${error.code}: ${error.message}`)
			}
			return null
		})
	if (!item) {
		return null
	}
	const thirdParty = await api.getThirdParty(item.socid)
	if (thirdParty) {
		item.setThirdParty(thirdParty)
	}
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
			if (!Array.isArray(response.data)) {
				console.log('Axios ThirdParties incorrect response: %o', response)
				return []
			}
			return response.data.map((item) => new ThirdParty(item))
		})
		.catch((error) => {
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios ThirdParties error %s: %s', error.code, error.message)
				throw new Error(`Axios ThirdParties error ${error.code}: ${error.message}`)
			}
			return []
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
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios ThirdParty error %s: %s', error.code, error.message)
				throw new Error(`Axios ThirdParty error ${error.code}: ${error.message}`)
			}
			return null
		})
	return item
}

/**
 * @see Dolibarr class htdocs/societe/class/societe.class.php
 */
api.createThirdParty = async (formData) => {
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
			console.log(`Axios create ThirdParty error: ${error}`)
			return { error: error.code }
		}
	)
	return id
}

/**
 * @see Dolibarr class htdocs/societe/class/societe.class.php
 */
api.createInvoice = async (formData) => {
	const socid = formData.get('socid')
	if (!socid) {
		return { error: 'error.empty-fields' }
	}
	const data = {
		socid: socid,
	}
	const id = await api.post('/invoices', data).then(
		(result) => {
			if (result.status === 200) {
				//console.log('Invoice created: %o', result.data)
				return result.data
			} else {
				return ''
			}
		},
		(error) => {
			console.log(`Axios create Invoice error: ${error}`)
			return { error: error.code }
		}
	)
	return id
}

api.addInvoiceLine = async (invoiceId, formData) => {
	const desc = formData.get('desc')
	const subprice = formData.get('subprice')
	let qty = formData.get('qty')
	let tva_tx = formData.get('tva_tx')
	let product_type = formData.get('product_type')
	let remise_percent = formData.get('remise_percent')
	if (!desc || desc === '' || !subprice || subprice === '' || subprice === '0') {
		return { error: 'error.empty-fields' }
	}
	// Set default values
	if (!qty || qty === '' || qty === 0) {
		qty = 1
	}
	if (!tva_tx || tva_tx === '') {
		tva_tx = 0
	}
	if (!product_type || product_type === '') {
		product_type = 1 // 1 for service, 2 for product
	}
	if (!remise_percent || remise_percent === '') {
		remise_percent = 0
	}
	const data = {
		desc: desc,
		subprice: subprice,
		qty: qty,
		tva_tx: tva_tx,
		product_type: product_type,
		remise_percent: remise_percent,
	}
	const id = await api.post(`/invoices/${invoiceId}/lines`, data).then(
		(result) => {
			if (result.status === 200) {
				//console.log('Invoice line created: %o', result.data)
				return result.data
			} else {
				return ''
			}
		},
		(error) => {
			console.log(`Axios create Invoice line error: ${error}`)
			return { error: error.code }
		}
	)
	return id
}

api.validateInvoice = async (invoiceId) => {
	const data = {}
	const id = await api.post(`/invoices/${invoiceId}/validate`, data).then(
		(result) => {
			if (result.status === 200) {
				//console.log('Invoice validated: %o', result.data)
				return result.data
			} else {
				return ''
			}
		},
		(error) => {
			console.log(`Axios validate Invoice error: ${error}`)
			return { error: error.code }
		}
	)
	return id
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
