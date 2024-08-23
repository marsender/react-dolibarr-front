import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './reducers/userSlice'
import { loadState, saveState } from './localStorage'

const reducer = combineReducers({
	userReducer,
	// otherReducer,
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
