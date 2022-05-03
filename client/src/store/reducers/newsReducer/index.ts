import { createSlice } from '@reduxjs/toolkit'

import { News } from 'api/myApi/news/types'
import {
	createNewsThunk,
	deleteNewsThunk,
	editNewsThunk,
	getNewsThunk
} from './newsThunks'

const newsSlice = createSlice({
	name: 'news',
	initialState: {
		news: [] as News[]
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getNewsThunk.fulfilled, (state, { payload }) => {
				state.news = payload
			})
			.addCase(createNewsThunk.fulfilled, (state, { payload }) => {
				state.news = [...state.news, payload]
			})
			.addCase(editNewsThunk.fulfilled, (state, { payload }) => {
				const newsIndex = state.news.findIndex(news => news._id === payload._id)
				state.news[newsIndex] = payload
			})
			.addCase(deleteNewsThunk.fulfilled, (state, { payload }) => {
				state.news = state.news.filter(news => news._id !== payload)
			})
	}
})

export const newsReducer = newsSlice.reducer
