import { setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit'

import { mainReducer } from './reducers/mainReducer'
import { anilibriaRTK } from '@anilibriaApi/anilibriaRTK'

export const store = configureStore({
	reducer: {
		main: mainReducer,
		[anilibriaRTK.reducerPath]: anilibriaRTK.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(anilibriaRTK.middleware),
	devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
