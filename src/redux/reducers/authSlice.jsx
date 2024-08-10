import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false,
	userToken: '',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload
			if (action.payload == false) {
				state.userToken = ''
			}
		},
		setUserToken: (state, action) => {
			state.userToken = action.payload
		},
	},
})

export const { setLoggedIn, setUserToken } = authSlice.actions
export default authSlice.reducer
