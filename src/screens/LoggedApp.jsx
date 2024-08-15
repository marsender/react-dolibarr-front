import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoggedHome from './LoggedHome'
import Invoices from './Invoices'
import Invoice from './Invoice'
import Logout from './Logout'
import Navbar from './Navbar'
import ThirdParty from './ThirdParty'
import ThirdParties from './ThirdParties'

const LoggedApp = () => {
	return (
		<>
			<Router>
				<Navbar />
				<main role="main" className="dark:text-white">
					<Routes>
						<Route path="/" element={<LoggedHome />} />
						<Route path="/invoices" element={<Invoices />} />
						<Route path="/invoice/:id" element={<Invoice />} />
						<Route path="/thirdparties" element={<ThirdParties />} />
						<Route path="/thirdparty/:id" element={<ThirdParty />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				</main>
			</Router>
		</>
	)
}

export default LoggedApp
