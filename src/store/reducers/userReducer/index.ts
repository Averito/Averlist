import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Anime } from 'api/myApi/anime/types'
import {
	createAnimeThunk,
	editStatusAnimeThunk,
	getAnimeListThunk,
	getUserThunk,
	removeAnimeThunk
} from './userThunks'
import { errorMessage } from 'helpers/messages'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: '',
		login: '',
		email: '',
		password: '',
		animeList: [] as Anime[],
		animeListSort: [] as Anime[],
		loading: false,
		error: false
	},
	reducers: {
		sortAnimeList(
			state,
			{ payload }: PayloadAction<{ search: string; statusFilter: string }>
		) {
			const { search, statusFilter } = payload
			state.animeListSort = state.animeList
				.filter(anime => anime?.name?.includes(search))
				.filter(anime =>
					statusFilter !== '-1'
						? anime?.status?.toString()?.includes(statusFilter.toString())
						: true
				)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAnimeListThunk.fulfilled, (state, { payload }) => {
				state.error = false
				state.loading = false
				state.animeList = payload
				state.animeListSort = payload
			})
			.addCase(getAnimeListThunk.pending, (state, { payload }) => {
				state.loading = true
			})
			.addCase(getAnimeListThunk.rejected, (state, { payload }) => {
				errorMessage(
					'Не удалось подключиться к серверу, попробуй перезагрузить страницу'
				)
				state.error = true
			})
			.addCase(getUserThunk.fulfilled, (state, { payload }) => {
				state.login = payload.login as string
				state.email = payload.email
				state.password = payload.password
				state.id = payload._id as string
			})
			.addCase(createAnimeThunk.fulfilled, (state, { payload }) => {
				state.animeList = [...state.animeList, payload]
				state.animeListSort = [...state.animeListSort, payload]
			})
			.addCase(editStatusAnimeThunk.fulfilled, (state, { payload }) => {
				// -- animeList --
				const newAnimeList = JSON.parse(JSON.stringify(state.animeList))

				const animeForEditIndex = state.animeList.findIndex(
					anime => anime._id === payload.id
				)
				newAnimeList[animeForEditIndex].status = payload.anime.status

				state.animeList = newAnimeList
				// -- animeListSort --
				const newAnimeListSort = JSON.parse(JSON.stringify(state.animeListSort))

				const animeSortForEditIndex = state.animeListSort.findIndex(
					anime => anime._id === payload.id
				)
				newAnimeListSort[animeSortForEditIndex].status = payload.anime.status

				state.animeListSort = newAnimeListSort
			})
			.addCase(removeAnimeThunk.fulfilled, (state, { payload }) => {
				state.animeList = state.animeList.filter(
					anime => anime._id !== payload._id
				)
				state.animeListSort = state.animeListSort.filter(
					anime => anime._id !== payload._id
				)
			})
	}
})

export const { reducer: userReducer } = userSlice
export const { sortAnimeList } = userSlice.actions
