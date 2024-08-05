import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoggedHome from './LoggedHome'
import Tests from './Tests'
import Logout from './Logout'
import Navbar from './Navbar'

const LoggedApp = () => {
	return (
		<>
			<Router>
				<Navbar />
				<main role="main" className="dark:text-white">
					<Routes>
						<Route path="/" element={<LoggedHome />} />
						<Route path="/tests" element={<Tests />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				</main>
			</Router>
		</>
	)
}

export default LoggedApp
