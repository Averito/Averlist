import { createSlice } from '@reduxjs/toolkit'

import { getTitleListThunk } from './mainThunks'
import { Title } from '@anilibriaApi/types'

const mainSlice = createSlice({
	name: 'main',
	initialState: {
		isAuth: false,
		titleList: [] as Title[]
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getTitleListThunk.fulfilled, (state, { payload }) => {
			state.titleList = payload
		})
	}
})

export const mainReducer = mainSlice.reducer
