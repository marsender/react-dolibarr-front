import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../services/apiService'

const ThirdParties = () => {
	const { t } = useTranslation()
	const [thirdParties, setThirdParties] = useState([])

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('thirdparties.title')
		api.getThirdParties().then((response) => {
			setThirdParties(response)
		})
	}, [])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('thirdparties.title')}</h1>
			<ul>
				{thirdParties.map((item) => (
					<li key={item.id}>
						<Link to={item.url}>CODE: {item.code_client}</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default ThirdParties
