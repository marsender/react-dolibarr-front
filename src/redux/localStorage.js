const BREAKING_CHANGE_TIMESTAMP = 1711386827 // http://www.timestamp.fr/

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state')
		//console.log('serializedState: %o', serializedState)

		if (serializedState === null) {
			return undefined
		}

		const loaded = JSON.parse(serializedState)

		if (!loaded.cacheBuster || loaded.cacheBuster < BREAKING_CHANGE_TIMESTAMP * 1000) {
			return undefined
		}

		// Initialize user state if not present
		if (!loaded.userReducer) {
			loaded.userReducer = {
				user: {},
				userProfileImage: null,
				isLoggedIn: false,
			}
		}
		//console.log('loaded state: %o', loaded)

		// const { cacheBuster, ...state } = loaded;
		const state = { ...loaded }
		delete state.cacheBuster

		return state
	} catch (err) {
		return undefined
	}
}

export const saveState = (state) => {
	//console.log('saveState: %o', state)
	try {
		const stateWithCacheBusting = {
			...state,
			cacheBuster: Date.now(),
		}
		const serializedState = JSON.stringify(stateWithCacheBusting, (key, value) => {
			if (value && value.$$typeof != null) {
				return null
			}
			return value
		})
		localStorage.setItem('state', serializedState)
	} catch (err) {
		console.log('Error in saving store', err)
	}
}
