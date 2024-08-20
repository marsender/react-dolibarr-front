export class Document {
	constructor(props) {
		this.name = props.name // eg: FA2408-0133.pdf
		this.path = props.filepath.split('/').pop() + '/' + props.name // filepath eg: facture/FA2408-0133
		const date = new Date(props.date * 1000)
		this.date = date.toLocaleDateString(process.env.LOCALE) // en-US
		this.srcObjectId = props.src_object_id
	}
}
