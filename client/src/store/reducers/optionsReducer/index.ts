import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ViewType } from './types'

const optionsSlice = createSlice({
	name: 'options',
	initialState: {
		viewType: 'profile' as ViewType
	},
	reducers: {
		setViewType(state, { payload }: PayloadAction<ViewType>) {
			state.viewType = payload
		}
	}
})

export const { reducer: optionsReducer } = optionsSlice
export const { setViewType } = optionsSlice.actions
