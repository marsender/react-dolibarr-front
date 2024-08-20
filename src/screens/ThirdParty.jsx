import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'
import ThirdPartyComponent from '../components/ThirdPartyComponent'
import ReturnButtonComponent from '../components/ReturnButtonComponent'

const ThirdParty = () => {
	const { t } = useTranslation()
	const [thirdParty, setThirdParty] = useState([])

	const { id } = useParams()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('thirdparty.title')
		api.getThirdParty(id).then((response) => {
			if (response) {
				setThirdParty(response)
			}
		})
	})

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				{t('thirdparty.title')} - {thirdParty.name}
			</h1>
			{ThirdPartyComponent(thirdParty, { detail: true })}
			<div className="mt-4 flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
				<ReturnButtonComponent link="/thirdparties" />
			</div>
		</>
	)
}

export default ThirdParty
