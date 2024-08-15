import { InvoiceLine } from './InvoiceLine'

export class Invoice {
	constructor(props) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
		const numberFormatter = new Intl.NumberFormat(process.env.LOCALE, {
			style: 'decimal', // Other options: 'currency', 'percent', etc.
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
		this.id = props.id
		this.ref = props.ref
		this.socid = props.socid
		this.thirdParty = null
		this.thirdPartyName = ''
		this.url = `/invoice/${props.id}`
		const dateValidation = new Date(props.date_validation * 1000)
		this.dateValidation = dateValidation.toLocaleDateString(process.env.LOCALE) // en-US
		this.totalHt = numberFormatter.format(props.total_ht) + ' ' + process.env.CURRENCY
		this.totalTtc = numberFormatter.format(props.total_ttc) + ' ' + process.env.CURRENCY
		this.lines = props.lines.map((item) => new InvoiceLine(item))
	}
	setThirdParty(thirdParty) {
		this.thirdParty = thirdParty
		this.thirdPartyName = thirdParty.name
	}
	// List of properties to fetch
	static getApiProperties() {
		return 'id,ref,socid,date_validation,total_ht,total_ttc,lines'
	}
}