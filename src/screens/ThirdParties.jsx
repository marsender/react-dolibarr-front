import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'
import ThirdPartyComponent from '../components/ThirdPartyComponent'

const ThirdParties = () => {
	const { t } = useTranslation()
	const [thirdParties, setThirdParties] = useState([])

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('thirdparties.title')
		api.getThirdParties().then((response) => {
			setThirdParties(response)
		})
	})

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">{t('thirdparties.title')}</h1>
			<ul className="divide-y divide-gray-200 dark:divide-gray-700">
				{thirdParties.map((item) => (
					<li key={item.id} className="py-2 sm:py-2">
						{ThirdPartyComponent(item, { detail: false })}
					</li>
				))}
			</ul>
		</>
	)
}

export default ThirdParties
