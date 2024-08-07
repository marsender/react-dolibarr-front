import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../redux/reducers/authSlice'
import { User } from '../../models/User'
import api from '../../services/apiService'

const Login = () => {
	const { t } = useTranslation()
	const [error, setError] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('login.title')
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = new FormData(e.target)
		const username = data.get('username')
		const password = data.get('password')
		try {
			await api
				.post('login', {
					login: username,
					password: password,
				})
				.then(
					(result) => {
						if (result.status === 200) {
							console.log('Login ok with token: %s', result.data.success.token)
							//this.context.setAuthTokens(result.data.success.token)
							api.defaults.headers = {
								DOLAPIKEY: result.data.success.token,
							}
							api
								.get('users/info')
								.then((userInfo) => {
									const userInfoData = userInfo.data
									let user = new User(result.data.success.token)
									user.contact_id = userInfoData.contact_id
									user.email = userInfoData.email
									user.entity = userInfoData.entity
									user.firstname = userInfoData.firstname
									user.id = userInfoData.id
									user.lastname = userInfoData.lastname
									user.login = userInfoData.login
									user.societe_id = userInfoData.societe_id
									user.user_mobile = userInfoData.user_mobile
									user.address = userInfoData.address
									user.zip = userInfoData.zip
									user.town = userInfoData.town

									api.get('thirdparties/' + user.entity).then((thridParty) => {
										const thridPartyData = thridParty.data
										user.third_party.id = thridPartyData.id
										user.third_party.name = thridPartyData.name
										user.third_party.name_alias = thridPartyData.name_alias
										user.third_party.status = thridPartyData.status
										user.third_party.code_client = thridPartyData.code_client
										user.third_party.address = thridPartyData.address
										user.third_party.zip = thridPartyData.zip
										user.third_party.town = thridPartyData.town
										//this.context.setUser(user)
										//this.props.history.push(this.state.referer)
									})
								})
								.catch((e) => console.log(e))
							dispatch(setLoggedIn(true))
						} else {
							dispatch(setLoggedIn(false))
						}
					},
					(error) => {
						setError(t('login.error'))
						console.log('Login error: %o', error)
					}
				)
			navigate('/')
		} catch (err) {
			setError(t('login.error'))
			console.log('Login exception: %o', err)
		}
	}

	return (
		<>
			<div className="p-4 modal:p-0 bg-gray-800 rounded-lg">
				<h2 className="mb-3 text-2xl font-semibold">{t('login.title')}</h2>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-6">
						<div>
							<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								{t('label.username')}
							</label>
							<input id="username" type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
						</div>
						<div>
							<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								{t('label.password')}
							</label>
							<input id="password" type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
						</div>
						{error && <div className="error smallMargin-t">{error}</div>}
						<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
							<Link to="/" className="ml-4">
								{t('label.cancel')}
							</Link>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default Login
