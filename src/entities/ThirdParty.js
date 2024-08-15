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
	// List of properties to fetch
	static getApiProperties() {
		return 'id,name,address,zip,town,status,code_client,email,phone'
	}
	static getTestSample() {
		return {
			id: 1,
			name: 'Third pary name',
			address: 'My address',
			zip: 'My zip',
			town: 'My town',
			status: 'My status',
			code_client: 'CUS_0001',
			email: 'bip@test.com',
			phone: '0669016901',
		}
	}
}
