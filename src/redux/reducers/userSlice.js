import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {}, // Store the user as a plain object
	userProfileImage: null,
	isLoggedIn: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			// Convert the payload to a plain object
			state.user = action.payload.user
			state.userProfileImage = action.payload.userProfileImage
			state.isLoggedIn = true
		},
		logout: (state) => {
			// Reset the user to a new empty User instance as a plain object
			state.user = {}
			state.userProfileImage = null
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
export const selectUserProfileImage = (state) => state.userReducer.userProfileImage
export const selectIsLoggedIn = (state) => state.userReducer.isLoggedIn

// Export the reducer
export default userSlice.reducer
