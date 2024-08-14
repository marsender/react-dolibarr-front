import he from 'he'

export class InvoiceLine {
	constructor(props) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
		const numberFormatter = new Intl.NumberFormat(process.env.LOCALE, {
			style: 'decimal', // Other options: 'currency', 'percent', etc.
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
		this.id = props.id
		this.desc = he.decode(props.desc)
		this.qty = props.qty
		this.duree = props.duree
		this.remise_percent = props.remise_percent
		this.subprice = numberFormatter.format(props.subprice) + ' ' + process.env.CURRENCY
		this.totalHt = numberFormatter.format(props.total_ht) + ' ' + process.env.CURRENCY
		this.totalTva = numberFormatter.format(props.total_tva) + ' ' + process.env.CURRENCY
		this.totalTtc = numberFormatter.format(props.total_ttc) + ' ' + process.env.CURRENCY
		this.tvaTx = props.tva_tx
	}
}
