import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom'
import Login from './Login'
import UnloggedHome from './UnloggedHome'
import Loading from './Loading'
import logo from '/react.svg'

const UnloggedApp = () => {
	const { t } = useTranslation()

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				React project (unlogged app)
				<img src={logo} alt="Vite logo" className="inline-image ml-2" />
			</h1>
			<Router>
				<Routes>
					<Route path="/" element={<UnloggedHome />} />
					<Route path="/login" element={<Login />} />
					<Route path="/loading" element={<Loading />} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</Routes>
			</Router>
		</>
	)
}

export default UnloggedApp
