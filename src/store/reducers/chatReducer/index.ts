import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from 'api/myApi/auth/types'
import { ChatViewType } from './types'

const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		currentDialogMember: {} as User,
		viewType: 'main' as ChatViewType
	},
	reducers: {
		setCurrentDialogMember(state, { payload }: PayloadAction<User>) {
			state.currentDialogMember = payload
		},
		setChatViewType(state, { payload }: PayloadAction<ChatViewType>) {
			state.viewType = payload
		}
	}
})

export const chatReducer = chatSlice.reducer
export const { setCurrentDialogMember, setChatViewType } = chatSlice.actions
