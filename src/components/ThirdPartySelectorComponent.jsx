import React from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/apiService'

function ThirdPartySelectorComponent() {
	const { t } = useTranslation()
	const [thirdParties, setThirdParties] = React.useState([])
	const [selectedThirdParty, setSelectedThirdParty] = React.useState('')

	React.useEffect(() => {
		api.getThirdParties().then((response) => {
			const thirdParties = response.map((item) => {
				return { id: item.id, name: item.name }
			})
			setThirdParties(thirdParties)
		})
	})

	const handleChange = (event) => {
		const selectedId = event.target.value
		setSelectedThirdParty(selectedId)
	}

	return (
		<div>
			<label htmlFor="socid" className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				{t('thirdparty.title')}
			</label>
			<select required name="socid" value={selectedThirdParty} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="" disabled>
					{t('thirdparty.select')}
				</option>
				{thirdParties.map((party) => (
					<option key={party.id} value={party.id}>
						{party.name}
					</option>
				))}
			</select>
		</div>
	)
}

export default ThirdPartySelectorComponent
