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
				{t('thirdparty.title')} - {thirdParty.name}
			</h1>
			<div className="flex flex-wrap text-lg">
				{/* <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">{thirdParty.code_client}</div> */}
				<h1 className="flex-auto font-semibold">{thirdParty.email}</h1>
				<div className="text-lg font-semibold text-slate-500">{thirdParty.phone}</div>
			</div>
		</>
	)
}

export default ThirdParty
