import { createSlice } from '@reduxjs/toolkit'

import { News } from 'api/myApi/news/types'
import {
	createNewsThunk,
	removeNewsThunk,
	editNewsThunk,
	getNewsThunk
} from './newsThunks'

const newsSlice = createSlice({
	name: 'news',
	initialState: {
		news: [] as News[],
		loading: false
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getNewsThunk.fulfilled, (state, { payload }) => {
				state.loading = false
				state.news = payload.reverse()
			})
			.addCase(getNewsThunk.pending, state => {
				state.loading = true
			})
			.addCase(createNewsThunk.fulfilled, (state, { payload }) => {
				state.news = [...state.news, payload].reverse()
			})
			.addCase(editNewsThunk.fulfilled, (state, { payload }) => {
				const newsIndex = state.news.findIndex(news => news._id === payload._id)
				state.news[newsIndex] = payload
			})
			.addCase(removeNewsThunk.fulfilled, (state, { payload }) => {
				state.news = state.news.filter(news => news._id !== payload)
			})
	}
})

export const newsReducer = newsSlice.reducer
