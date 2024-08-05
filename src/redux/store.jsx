import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './reducers/authSlice'
import { loadState, saveState } from './localStorage'

const reducer = combineReducers({
	authReducer,
})

const preloadedState = loadState()
const store = configureStore({
	reducer,
	preloadedState,
})

store.subscribe(() => {
	const state = store.getState()
	saveState(state)
})

export default store
