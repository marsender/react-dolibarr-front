export class Invoice {
	constructor(item) {
		let dateValidation = new Date(item.date_validation * 1000)
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
		const numberFormatter = new Intl.NumberFormat(process.env.LOCALE, {
			style: 'decimal', // Other options: 'currency', 'percent', etc.
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
		this.id = item.id
		this.ref = item.ref
		this.dateValidation = dateValidation.toLocaleDateString(process.env.LOCALE) // en-US
		this.totalHt = numberFormatter.format(item.total_ht) + ' ' + process.env.CURRENCY
		this.totalTtc = numberFormatter.format(item.total_ttc) + ' ' + process.env.CURRENCY
	}
}
