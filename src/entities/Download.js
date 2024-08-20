export class Download {
	constructor(props) {
		this.filename = props.filename // eg: FA2408-0133.pdf
		this.contentType = props['content-type'] // eg: application/pdf
		this.filesize = props.filesize
		this.content = props.content
		this.encoding = props.encoding // eg: base64
	}
}
