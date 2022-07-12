import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({
	name: 'main',
	initialState: {
		isAuth: false
	},
	reducers: {}
})

export const mainReducer = mainSlice.reducer
