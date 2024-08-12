export class ThirdParty {
	constructor(props) {
		this.id = props.id
		this.name = props.name
		this.address = props.address
		this.zip = props.zip
		this.town = props.town
		this.status = props.status
		this.code_client = props.code_client
		this.url = `/thirdparty/${props.id}`
		this.email = props.email
		this.phone = props.phone
	}
}
