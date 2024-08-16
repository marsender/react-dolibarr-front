import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoggedHome from './LoggedHome'
import Invoice from './Invoice'
import Invoices from './Invoices'
import InvoiceForm from './InvoiceForm'
import Logout from './Logout'
import Navbar from './Navbar'
import ThirdParty from './ThirdParty'
import ThirdPartyForm from './ThirdPartyForm'
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
						<Route path="/invoice/add" element={<InvoiceForm />} />
						<Route path="/thirdparties" element={<ThirdParties />} />
						<Route path="/thirdparty/:id" element={<ThirdParty />} />
						<Route path="/thirdparty/add" element={<ThirdPartyForm />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				</main>
			</Router>
		</>
	)
}

export default LoggedApp
