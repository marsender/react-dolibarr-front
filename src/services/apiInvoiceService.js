import api from './apiService'
import apiThirdPartyService from './apiThirdPartyService'
import { Invoice } from '../entities/Invoice'

const apiInvoiceService = {
	getInvoices: async (filters) => {
		if (!api.validToken()) {
			return []
		}
		// Get all third party names
		const thirdPartiesNames = await apiThirdPartyService.getThirdPartyNames()
		// Get invoices
		// sqlfilters samples (t.ref:like:'FA%') (t.datec:>=:'2024-08-01')
		let sqlFilter = ''
		if (filters) {
			const { type, year, month } = filters
			let fromDate, toDate
			if (type === 'month' && year && month) {
				fromDate = new Date(Date.UTC(year, month - 1, 1)) // First day of the month
				toDate = new Date(Date.UTC(year, month, 1)) // First day of the next month
				sqlFilter = `&sqlfilters=(t.date_valid:>=:'${fromDate.toISOString().slice(0, 10)}') and (t.date_valid:<:'${toDate.toISOString().slice(0, 10)}')`
			} else if (type === 'year' && year) {
				fromDate = new Date(Date.UTC(year, 0, 1)) // First day of the year
				toDate = new Date(Date.UTC(year + 1, 0, 1)) // First day of the next year
				sqlFilter = `&sqlfilters=(t.date_valid:>=:'${fromDate.toISOString().slice(0, 10)}') and (t.date_valid:<:'${toDate.toISOString().slice(0, 10)}')`
			}
			//console.log('Type %s year %o month %o: %s', type, year, month, sqlFilter)
		}
		const properties = Invoice.getApiProperties(false)
		const items = await api
			.get('/invoices?sortfield=t.rowid&sortorder=DESC' + sqlFilter + '&properties=' + properties)
			.then((result) => {
				if (!Array.isArray(result.data)) {
					console.log('Axios Invoices incorrect response: %o', result)
					return []
				}
				return result.data.map((item) => {
					// The API may return IDs and numeric values as strings, so we parse them.
					const transformedItem = {
						...item,
						id: parseInt(item.id, 10),
						status: parseInt(item.status, 10),
						total_ht: parseFloat(item.total_ht),
						total_ttc: parseFloat(item.total_ttc),
					}
					const invoice = new Invoice(transformedItem)
					if (item.socid && thirdPartiesNames[item.socid] !== undefined) {
						invoice.setThirdPartyName(thirdPartiesNames[item.socid])
					}
					return invoice
				})
			})
			.catch((error) => {
				throw new Error(`Axios Invoices error ${error.code}: ${error.message}`)
			})
		return items
	},

	getInvoice: async (id) => {
		if (!api.validToken()) {
			throw new Error('Invoice: missing api token')
		}
		const item = await api
			.get(`/invoices/${id}`)
			.then((result) => {
				// The API may return IDs and numeric values as strings, so we parse them.
				const data = result.data
				let transformedLines = []
				if (data.lines && Array.isArray(data.lines)) {
					transformedLines = data.lines.map((line) => ({
						...line,
						id: parseInt(line.id, 10),
						total_ht: parseFloat(line.total_ht),
						total_ttc: parseFloat(line.total_ttc),
					}))
				}
				const transformedData = {
					...data,
					id: parseInt(data.id, 10),
					status: parseInt(data.status, 10),
					total_ht: parseFloat(data.total_ht),
					total_ttc: parseFloat(data.total_ttc),
					lines: transformedLines,
				}
				return new Invoice(transformedData)
			})
			.catch((error) => {
				throw new Error(`Axios Invoice error ${error.code}: ${error.message}`)
			})
		if (!item) {
			return null
		}
		const thirdParty = await apiThirdPartyService.getThirdParty(item.socid)
		if (thirdParty) {
			item.setThirdPartyName(thirdParty.name)
		}
		return item
	},

	/**
	 * @see Dolibarr class htdocs/compta/facture/class/facture.class.php
	 */
	createInvoice: async (formData) => {
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
	},

	updateInvoice: async (invoiceId, formData) => {
		if (!api.validToken()) {
			throw new Error('Invoice update: missing api token')
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
	},

	addInvoiceLine: async (invoiceId, formData) => {
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
	},

	invoiceValidate: async (invoiceId) => {
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
	},
}

export default apiInvoiceService
