import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import './App.css'
import Loading from './screens/Loading'
import LoggedApp from './screens/LoggedApp'
import UnloggedApp from './screens/UnloggedApp'
import ErrorBoundary from './components/error/ErrorBoundary'
import ErrorLogger from './components/error/ErrorLogger'
import api from './services/apiService'

function App() {
	const { t } = useTranslation()
	const logged = useSelector((state) => state.authReducer.isLoggedIn)
	const token = useSelector((state) => state.authReducer.userToken)
	//console.log('logged: %o - token: %o', logged, token)
	api.setToken(token)

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
