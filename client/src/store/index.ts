import { setupListeners } from '@reduxjs/toolkit/query/react'
import { configureStore } from '@reduxjs/toolkit'

import { anilibriaRTK } from '@anilibriaApi/anilibriaRTK'
import { mainReducer } from '@store/reducers/mainReducer'
import { galleryReducer } from '@store/reducers/galleryReducer'

export const store = configureStore({
	reducer: {
		main: mainReducer,
		gallery: galleryReducer,
		[anilibriaRTK.reducerPath]: anilibriaRTK.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(anilibriaRTK.middleware),
	devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
