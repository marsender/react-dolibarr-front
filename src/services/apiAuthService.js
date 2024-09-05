import api from './apiService'

const apiAuthService = {
	login: async (username, password) => {
		const token = await api
			.post('/login', {
				login: username,
				password: password,
			})
			.then(
				(result) => {
					if (result.status === 200) {
						//console.log('Login ok with token: %s', result.data.success.token)
						return result.data.success.token
					} else {
						console.log('Incorrect login')
						return null
					}
				},
				(error) => {
					throw new Error(`Axios Login error: ${error}`)
				}
			)
		// Set token in order to be able to fetch users
		api.setToken(token)
		const users = await api.getUsers(username)
		if (!Array.isArray(users) && users.length === 1) {
			throw new Error(`Axios user not found: ${username}`)
		}
		const user = users[0]
		user.setToken(token)
		// Get user profile image
		let download = null
		if (user.photo) {
			download = await api.getDocumentDownload('user', user.getProfilePicture()).then(
				(response) => {
					return response
				},
				(error) => {
					console.log('User profile image error: %o', error)
					return null
				}
			)
		}
		const payload = { user: user.toObject(), userProfileImage: download ? { ...download } : null }

		return payload
	},
}

export default apiAuthService
