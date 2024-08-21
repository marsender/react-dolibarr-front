export class BankAccount {
	constructor(props) {
		this.id = props.id
		this.label = props.label
	}
	// List of properties to fetch
	static getApiProperties() {
		return 'id,label'
	}
	static getTestSample() {
		return {
			id: 1,
			label: 'AXA Bank',
		}
	}
}
