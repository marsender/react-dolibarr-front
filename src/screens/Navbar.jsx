import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectUserProfileImage, logout } from '../redux/reducers/userSlice'
import logo from '/vite.svg'
import { User } from '../entities/User'
import ProfilePictureComponent from '../components/ProfilePictureComponent'

const Navbar = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = new User(useSelector(selectUser))
	const userProfileImage = useSelector(selectUserProfileImage)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
		if (!isDropdownOpen) {
			setIsMenuOpen(false)
		}
	}
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
		if (!isMenuOpen) {
			setIsDropdownOpen(false)
		}
	}

	const handleLogout = async () => {
		try {
			dispatch(logout())
			navigate('/')
		} catch (err) {
			console.log('Logout error: %o', err)
		}
	}

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src={logo} className="h-8" alt="" width={36} height={32} />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{t('app.title')}</span>
				</Link>
				<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" style={{ position: 'relative' }}>
					<button onClick={toggleDropdown} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isDropdownOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
						<span className="sr-only">Open user menu</span>
						<ProfilePictureComponent userProfileImage={userProfileImage} />
					</button>
					<div className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${isDropdownOpen ? '' : 'hidden'}`} id="user-dropdown" style={{ position: 'absolute', top: '0px', right: '0px', margin: '0px', transform: 'translate(10px, 50px)' }}>
						<div className="px-4 py-3">
							<span className="block text-sm text-gray-900 dark:text-white">{user.getFullName()}</span>
							<span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
						</div>
						<ul className="py-2" aria-labelledby="user-menu-button">
							<li>
								<Link to="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
									{t('label.logout')}
								</Link>
							</li>
						</ul>
					</div>
					<button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isMenuOpen}>
						<span className="sr-only">Open main menu</span>
						<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
						</svg>
					</button>
				</div>
				<div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-user">
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						{/*
						<li>
							<Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
								{t('home.title')}
							</Link>
						</li>
						*/}
						<li>
							<Link to="/invoices" onClick={toggleMenu} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
								{t('invoices.title')}
							</Link>
						</li>
						<li>
							<Link to="/thirdparties" onClick={toggleMenu} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
								{t('thirdparties.title')}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
