import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {}, // Store as a plain object
	isLoggedIn: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			// Convert the payload to a plain object
			state.user = action.payload
			state.isLoggedIn = true
		},
		logout: (state) => {
			// Reset the user to a new empty User instance as a plain object
			state.user = {}
			state.isLoggedIn = false
		},
		updateUser: (state, action) => {
			state.userReducer = { ...state.userReducer, ...action.payload }
		},
	},
})

// Export actions
export const { login, logout, updateUser } = userSlice.actions

// Export selectors
export const selectUser = (state) => state.userReducer.user
export const selectIsLoggedIn = (state) => state.userReducer.isLoggedIn

// Export the reducer
export default userSlice.reducer