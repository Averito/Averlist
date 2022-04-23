import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserSafity } from 'api/myApi/auth/types'
import { getAllUsersThunk } from './usersThunks'
import { errorMessage } from 'helpers/messages'

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		getUsersError: false,
		users: [] as UserSafity[]
	},
	reducers: {
		setGetUsersError(state, { payload }: PayloadAction<boolean>) {
			state.getUsersError = payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAllUsersThunk.fulfilled, (state, { payload }) => {
				const mappedUsersArr = payload.users.map(user => {
					return {
						_id: user._id,
						login: user.login,
						description: user?.description || '',
						avatar: user?.avatar || '',
						animeList: user.animeList
					}
				})
				state.getUsersError = false
				state.users = mappedUsersArr
			})
			.addCase(getAllUsersThunk.rejected, state => {
				state.getUsersError = true
				errorMessage('Не удалось получить список пользователей...')
			})
	}
})

export const { setGetUsersError } = usersSlice.actions
export const usersReducer = usersSlice.reducer
