import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tab } from '@components/Tabs'
import { tabs } from '@pages/Gallery/tabs'

const gallerySlice = createSlice({
	name: 'gallery',
	initialState: {
		animeImages: [] as string[],
		savedScrollHeight: 0,
		currentTab: tabs[0] as Tab
	},
	reducers: {
		setAnimeImages: (state, { payload }: PayloadAction<string[]>) => {
			state.animeImages = payload
		},
		appendAnimeImages: (state, { payload }: PayloadAction<string[]>) => {
			state.animeImages = [...state.animeImages, ...payload]
		},
		setScrollHeight: (state, { payload }: PayloadAction<number>) => {
			state.savedScrollHeight = payload
		},
		setCurrentTab: (state, { payload }: PayloadAction<Tab>) => {
			state.currentTab = payload
		}
	}
})

export const galleryReducer = gallerySlice.reducer
export const {
	setAnimeImages,
	appendAnimeImages,
	setScrollHeight,
	setCurrentTab
} = gallerySlice.actions
