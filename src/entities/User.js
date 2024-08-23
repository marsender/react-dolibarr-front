export class User {
	constructor(props) {
		this.token = props.token ?? null
		this.id = props.id ?? null
		this.login = props.login ?? null
		this.email = props.email ?? null
		this.firstname = props.firstname ?? null
		this.lastname = props.lastname ?? null
		this.datec = props.datec ?? null
		this.datelastlogin = props.datelastlogin ?? null
		this.photo = props.photo ?? null
	}
	setToken(token) {
		this.token = token
	}
	getToken() {
		return this.token
	}
	getFullName() {
		return this.firstname + ' ' + this.lastname
	}
	getProfilePicture() {
		const fileWithoutExt = this.photo.replace(/\.[^/.]+$/, '')
		const fileExt = this.photo.substr(this.photo.lastIndexOf('.') + 1)
		return this.id + '/photos/thumbs/' + fileWithoutExt + '_small.' + fileExt
	}
	toObject() {
		return {
			...this, // Spread the properties of the instance into a new object
		}
	}
	// List of properties to fetch
	static getApiProperties() {
		return 'id,login,email,firstname,lastname,datec,datelastlogin,photo'
	}
}
