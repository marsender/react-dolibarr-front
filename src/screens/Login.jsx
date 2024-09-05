import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { login, logout } from '../redux/reducers/userSlice'
import apiAuthService from '../services/apiAuthService'

const Login = () => {
	const { t } = useTranslation()
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('login.title')
	}, [t])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = new FormData(e.target)
		const username = data.get('username')
		const password = data.get('password')
		try {
			await apiAuthService.login(username, password).then((data) => {
				if (data) {
					//console.log('Login ok with data: %o', data)
					dispatch(login(data))
					navigate('/')
				} else {
					dispatch(logout())
				}
			})
		} catch (err) {
			setError(t('login.error'))
			console.log('Login exception: %o', err)
		}
	}

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('login.title')}</h1>
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
					<div>
						<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							{t('label.connection')}
						</button>
						<Link to="/" className="ml-4">
							{t('label.cancel')}
						</Link>
					</div>
				</div>
			</form>
		</>
	)
}

export default Login
