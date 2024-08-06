import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import './App.css'
import Loading from './components/Screens/Loading'
import LoggedApp from './components/Screens/LoggedApp'
import UnloggedApp from './components/Screens/UnloggedApp'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import ErrorLogger from './components/ErrorBoundary/ErrorLogger'

axios.defaults.withCredentials = true
axios.defaults.https = process.env.SITE_URL.search('https') > -1
axios.defaults.baseURL = process.env.SITE_URL + 'api/'

function App() {
	const { t } = useTranslation()
	const logged = useSelector((state) => state.authReducer.isLoggedIn)
	console.log('logged: %o', logged)

	useEffect(() => {
		document.title = t('app.title')
	}, [])

	return (
		<>
			<ErrorLogger />
			<ErrorBoundary>
				<Suspense fallback={<Loading />}>{logged ? <LoggedApp /> : <UnloggedApp />}</Suspense>
			</ErrorBoundary>
		</>
	)
}

export default App
