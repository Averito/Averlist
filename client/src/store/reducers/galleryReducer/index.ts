import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const gallerySlice = createSlice({
	name: 'gallery',
	initialState: {
		animeImages: [] as string[],
		savedScrollHeight: 0
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
		}
	}
})

export const galleryReducer = gallerySlice.reducer
export const { setAnimeImages, appendAnimeImages, setScrollHeight } =
	gallerySlice.actions
