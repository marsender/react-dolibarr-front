// src/services/apiService.js
import axios from 'axios'
import { User } from '../entities/User'
import { Invoice } from '../entities/Invoice'
import { ThirdParty } from '../entities/ThirdParty'
import { Document } from '../entities/Document'
import { Download } from '../entities/Download'
import { BankAccount } from '../entities/BankAccount'

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
					console.log('Incorrect login')
					return null
				}
			},
			(error) => {
				throw new Error(`Axios Login error: ${error}`)
			}
		)
	// Set token in order to be able to fetch users
	api.setToken(token)
	const users = await api.getUsers(username)
	if (!Array.isArray(users) && users.length === 1) {
		throw new Error(`Axios User not found: ${username}`)
	}
	const user = users[0]
	user.setToken(token)
	// Get user profile image
	let download = null
	if (user.photo.length) {
		const parts = user.photo.split('.')
		const path = user.id + '/photos/thumbs/' + parts[0] + '_small.' + parts[1]
		download = await api.getDocumentDownload('user', path).then(
			(response) => {
				return response
			},
			(error) => {
				console.log('User profile image error: %o', error)
				return null
			}
		)
	}
	const payload = { user: user.toObject(), userProfileImage: download ? { ...download } : null }

	return payload
}

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

api.getInvoices = async () => {
	if (!api.validToken()) {
		return []
	}
	// Get all third party names
	const thirdPartiesNames = await api.getThirdPartyNames()
	// Get invoices
	// sqlfilters samples (t.ref:like:'FA%') (t.datec:>=:'2024-08-01')
	const date = new Date() // Get the current date
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 12)
	const sqlFilter = "&sqlfilters=(t.datec:>=:'" + firstDay.toISOString().slice(0, 10) + "')"
	const properties = Invoice.getApiProperties()
	const items = await api
		.get('/invoices?sortfield=t.rowid&sortorder=DESC' + sqlFilter + '&properties=' + properties)
		.then((result) => {
			if (!Array.isArray(result.data)) {
				console.log('Axios Invoices incorrect response: %o', result)
				return []
			}
			return result.data.map((item) => {
				const invoice = new Invoice(item)
				if (item.socid && thirdPartiesNames[item.socid] !== undefined) {
					invoice.setThirdPartyName(thirdPartiesNames[item.socid])
				}
				return invoice
			})
		})
		.catch((error) => {
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios Invoices error %s: %s', error.code, error.message)
				throw new Error(`Axios Invoices error ${error.code}: ${error.message}`)
			}
			return []
		})
	// Fetch third party for each invoice
	// await Promise.all(
	// 	items.map(async (item) => {
	// 		const thirdParty = await api.getThirdParty(item.socid)
	// 		if (thirdParty) {
	// 			item.setThirdPartyName(thirdParty.name)
	// 		}
	// 	})
	// )
	return items
}

api.getInvoice = async (id) => {
	if (!api.validToken()) {
		throw new Error('Axios Invoice: missing api token')
	}
	const item = await api
		.get(`/invoices/${id}`)
		.then((result) => {
			let item = new Invoice(result.data)
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
		item.setThirdPartyName(thirdParty.name)
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
		.then((result) => {
			if (!Array.isArray(result.data)) {
				console.log('Axios ThirdParties incorrect response: %o', result)
				return []
			}
			return result.data.map((item) => new ThirdParty(item))
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

/**
 * Get an object with third party keys associated to names
 * eg: { 1: "Name 1", 2: "Name 2" }
 */
api.getThirdPartyNames = async () => {
	if (!api.validToken()) {
		return {}
	}
	const thirdParties = await api.getThirdParties()
	const obj = thirdParties
		.map((item) => {
			return { key: item.id, value: item.name }
		})
		.reduce((obj, item) => {
			obj[item.key] = item.value
			return obj
		}, {})
	return obj
}

api.getThirdParty = async (id) => {
	if (!api.validToken()) {
		throw new Error('ThirdParty: missing api token')
	}
	const item = await api
		.get(`/thirdparties/${id}`)
		.then((result) => {
			return new ThirdParty(result.data)
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
	if (!api.validToken()) {
		throw new Error('Third party create: missing api token')
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
}

/**
 * @see Dolibarr class htdocs/compta/facture/class/facture.class.php
 */
api.createInvoice = async (formData) => {
	if (!api.validToken()) {
		throw new Error('Invoice create: missing api token')
	}
	const socid = formData.get('socid')
	const bankAccount = formData.get('fk_account')
	if (!socid || !bankAccount) {
		return { error: 'error.empty-fields' }
	}
	const data = {
		socid: socid,
		fk_account: bankAccount,
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
			console.log(`Axios Invoice create error: ${error}`)
			return { error: error.code }
		}
	)
	return id
}

api.updateInvoice = async (invoiceId, formData) => {
	if (!api.validToken()) {
		throw new Error('Invoice add line: missing api token')
	}
	const data = {}
	// Add properties if set
	const bankAccount = formData.get('fk_account')
	if (bankAccount.length) {
		data.fk_account = bankAccount
	}
	const socid = formData.get('socid')
	if (bankAccount.socid) {
		data.socid = socid
	}
	const json = await api.put(`/invoices/${invoiceId}`, data).then(
		(result) => {
			if (result.status === 200) {
				console.log('Invoice updated: %o', result.data)
				return result.data
			} else {
				return ''
			}
		},
		(error) => {
			console.log(`Axios Invoice update error: ${error}`)
			return { error: error.code }
		}
	)
	return json
}

api.addInvoiceLine = async (invoiceId, formData) => {
	if (!api.validToken()) {
		throw new Error('Invoice add line: missing api token')
	}
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
			console.log(`Axios Invoice create line error: ${error}`)
			return { error: error.code }
		}
	)
	return id
}

api.invoiceValidate = async (invoiceId) => {
	if (!api.validToken()) {
		throw new Error('Invoice validate: missing api token')
	}
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
			console.log(`Axios Invoice validate error: ${error}`)
			return { error: error.code }
		}
	)
	return id
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
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios ThirdParties error %s: %s', error.code, error.message)
				throw new Error(`Axios Documents module error ${error.code}: ${error.message}`)
			}
			return []
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
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios ThirdParty error %s: %s', error.code, error.message)
				throw new Error(`Axios Document download error ${error.code}: ${error.message}`)
			}
			return null
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
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios BankAccounts error %s: %s', error.code, error.message)
				throw new Error(`Axios BankAccounts error ${error.code}: ${error.message}`)
			}
			return []
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
			if (error.code !== 'ECONNABORTED') {
				//console.log('Axios Users error %s: %s', error.code, error.message)
				throw new Error(`Axios Users error ${error.code}: ${error.message}`)
			}
			return []
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
