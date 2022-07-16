import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const mainSlice = createSlice({
	name: 'main',
	initialState: {
		isAuth: false,
		isAdult: false
	},
	reducers: {
		setIsAdult(state, { payload }: PayloadAction<boolean>) {
			state.isAdult = payload
		}
	}
})

export const mainReducer = mainSlice.reducer
export const { setIsAdult } = mainSlice.actions
