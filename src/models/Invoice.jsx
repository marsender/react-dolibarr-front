export class Invoice {
	constructor(props) {
		let dateValidation = new Date(props.date_validation * 1000)
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
		const numberFormatter = new Intl.NumberFormat(process.env.LOCALE, {
			style: 'decimal', // Other options: 'currency', 'percent', etc.
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
		this.id = props.id
		this.ref = props.ref
		this.url = `/invoice/${props.id}`
		this.dateValidation = dateValidation.toLocaleDateString(process.env.LOCALE) // en-US
		this.totalHt = numberFormatter.format(props.total_ht) + ' ' + process.env.CURRENCY
		this.totalTtc = numberFormatter.format(props.total_ttc) + ' ' + process.env.CURRENCY
	}
}
