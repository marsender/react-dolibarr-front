export class User {
	constructor(props) {
		this.token = ''
		this.id = props.id
		this.login = props.login
		this.email = props.firstname = props.firstname
		this.lastname = props.lastname
		this.datec = props.datec
		this.datelastlogin = props.datelastlogin
		this.photo = props.photo
	}
	setToken(token) {
		this.token = token
	}
	getToken() {
		return this.token
	}
	// List of properties to fetch
	static getApiProperties() {
		return 'id,login,email,firstname,lastname,datec,datelastlogin,photo'
	}
}
