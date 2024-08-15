import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const UnloggedHome = () => {
	const { t } = useTranslation()

	useEffect(() => {
		document.title = t('app.title')
	})

	return (
		<Link to="/login">
			<button>{t('label.connection')}</button>
		</Link>
	)
}

export default UnloggedHome
