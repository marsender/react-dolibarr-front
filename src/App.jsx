import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { selectUser, selectIsLoggedIn } from './redux/reducers/userSlice'
import { User } from './entities/User'
import Loading from './screens/Loading'
import LoggedApp from './screens/LoggedApp'
import UnloggedApp from './screens/UnloggedApp'
import ErrorBoundary from './components/error/ErrorBoundary'
import ErrorLogger from './components/error/ErrorLogger'
import api from './services/apiService'
import './App.css'

function App() {
	const user = new User(useSelector(selectUser))
	const isLoggedIn = useSelector(selectIsLoggedIn)
	api.setToken(user.getToken())

	return (
		<>
			<ErrorLogger />
			<ErrorBoundary>
				<Suspense fallback={<Loading />}>{isLoggedIn ? <LoggedApp /> : <UnloggedApp />}</Suspense>
			</ErrorBoundary>
		</>
	)
}

export default App
