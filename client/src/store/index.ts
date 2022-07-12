import { configureStore } from '@reduxjs/toolkit'

import { mainReducer } from './reducers/mainReducer'

export const store = configureStore({
	reducer: {
		main: mainReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
