import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/reducers/userSlice'

const Logout = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = async () => {
		try {
			dispatch(logout())
			navigate('/')
		} catch (err) {
			console.log('Logout error: %o', err)
		}
	}

	return <button onClick={handleLogout}>{t('label.logout')}</button>
}

export default Logout
