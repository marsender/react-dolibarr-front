import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const LoggedHome = () => {
	const { t } = useTranslation()

	return (
		<>
			<h1 className="my-4 text-2xl font-semibold">{t('home.title')}</h1>
			<ul>
				<li>
					<Link to="/tests">Tests</Link>
				</li>
			</ul>
			<Logout />
		</>
	)
}

export default LoggedHome