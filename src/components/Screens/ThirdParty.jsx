import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../services/apiService'

const ThirdParty = () => {
	const { t } = useTranslation()
	const [thirdParty, setThirdParty] = useState([])

	const { id } = useParams()

	useEffect(() => {
		document.title = t('app.title') + ' - ' + t('thirdparty.title')
		api.getThirdParty(id).then((response) => {
			setThirdParty(response)
		})
	}, [])

	return (
		<>
			<h1 className="flex text-center my-4 text-2xl font-semibold">
				{t('thirdparty.title')} {thirdParty.code_client}
			</h1>
			<div className="flex flex-wrap">
				<h1 className="flex-auto text-lg font-semibold">{thirdParty.name}</h1>
			</div>
		</>
	)
}

export default ThirdParty
