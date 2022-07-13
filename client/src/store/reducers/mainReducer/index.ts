import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getTitleListThunk } from './mainThunks'
import { Title } from '@anilibriaApi/types'

const mainSlice = createSlice({
	name: 'main',
	initialState: {
		isAuth: false,
		isAdult: false,
		titleList: [] as Title[]
	},
	reducers: {
		setIsAdult(state, { payload }: PayloadAction<boolean>) {
			state.isAdult = payload
		}
	},
	extraReducers: builder => {
		builder.addCase(getTitleListThunk.fulfilled, (state, { payload }) => {
			state.titleList = payload
		})
	}
})

export const mainReducer = mainSlice.reducer
export const { setIsAdult } = mainSlice.actions
