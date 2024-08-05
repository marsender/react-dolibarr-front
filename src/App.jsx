import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './App.css'
import Loading from './components/Screens/Loading'
import LoggedApp from './components/Screens/LoggedApp'
import UnloggedApp from './components/Screens/UnloggedApp'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

axios.defaults.withCredentials = true
axios.defaults.https = process.env.SITE_URL.search('https') > -1
axios.defaults.baseURL = process.env.SITE_URL + 'api/'

function App() {
	const logged = useSelector((state) => state.authReducer.isLoggedIn)
	console.log('logged: %o', logged)

	return (
		<ErrorBoundary>
			<Suspense fallback={<Loading />}>{logged ? <LoggedApp /> : <UnloggedApp />}</Suspense>
		</ErrorBoundary>
	)
}

export default App
