import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Anime } from 'api/myApi/anime/types'
import {
	createAnimeThunk,
	editStatusAnimeThunk,
	getAnimeListThunk,
	getUserThunk,
	removeAnimeThunk,
	setAvatarThunk,
	editUserThunk,
	forgotPasswordThunk,
	createInvitationThunk,
	removeInvitationThunk,
	removeFriendThunk,
	acceptInvitationThunk,
	declineInvitationThunk,
	getMeInvitationsThunk
} from './userThunks'
import { errorMessage } from 'helpers/messages'
import { errorToast, successToast } from 'helpers/toast'
import { User } from 'api/myApi/auth/types'
import { NormalInvitation } from 'api/myApi/invitation/types'
import { mapInvitations } from 'utils/mapInvitations'
import { uniqueFriendList } from 'utils/uniqueFriendList'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: '',
		login: '',
		email: '',
		password: '',
		description: '' as string,
		avatar: '' as string,
		friendList: [] as User[],
		meInvitations: [] as NormalInvitation[],
		myInvitations: [] as NormalInvitation[],
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
				const [user] = payload

				const meInvitations = mapInvitations(user.meInvitations || [])
				const myInvitations = mapInvitations(user.myInvitations || [])

				state.login = user.login as string
				state.id = user._id as string
				state.email = user.email
				state.description = user?.description || ''
				state.avatar = user?.avatar || ''
				state.friendList = user?.friendList || []
				state.meInvitations = meInvitations
				state.myInvitations = myInvitations
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
			.addCase(setAvatarThunk.fulfilled, (state, { payload }) => {
				successToast('Новая аватарка успешно загружена!')
				state.avatar = payload?.avatar || ''
			})
			.addCase(setAvatarThunk.rejected, state => {
				errorToast('Не удалось загрузить аватарку...')
			})
			.addCase(editUserThunk.fulfilled, (state, { payload }) => {
				successToast(
					'Данные успешно сохранены и переданы пользователю AnnDegtyareva'
				)
				state.login = payload.login as string
				state.description = payload?.description || ''
			})
			.addCase(editUserThunk.rejected, state => {
				errorToast('Сохранение не удалось')
			})
			.addCase(forgotPasswordThunk.fulfilled, (state, { payload }) => {
				successToast('Пароль успешно изменён!')
				state.password = payload.password
			})
			.addCase(forgotPasswordThunk.rejected, () => {
				errorToast('Проверьте введённый пароль')
			})
			.addCase(createInvitationThunk.fulfilled, (state, { payload }) => {
				successToast('Заявка в друзья отправлена!')
				state.myInvitations = [...state.myInvitations, payload]
			})
			.addCase(removeInvitationThunk.fulfilled, (state, { payload }) => {
				successToast('Заявка в друзья отменена')
				state.myInvitations = state.myInvitations.filter(
					invitation => invitation.invitedUser._id !== payload
				)
			})
			.addCase(removeFriendThunk.fulfilled, (state, { payload }) => {
				successToast('Пользователь был удалён из друзей')
				state.friendList = state.friendList.filter(
					friend => friend._id !== payload.friendId
				)
			})
			.addCase(acceptInvitationThunk.fulfilled, (state, { payload }) => {
				state.friendList = uniqueFriendList([
					...state.friendList,
					payload.senderUser
				])
				state.meInvitations = state.meInvitations.filter(
					invitation =>
						!(
							invitation.invitedUser._id === payload.invitedUser._id &&
							invitation.senderUser._id === payload.senderUser._id
						)
				)
			})
			.addCase(declineInvitationThunk.fulfilled, (state, { payload }) => {
				state.meInvitations = state.meInvitations.filter(
					invitation => invitation._id !== payload
				)
			})
			.addCase(getMeInvitationsThunk.fulfilled, (state, { payload }) => {
				const [user] = payload
				const meInvitations = mapInvitations(user.meInvitations || [])
				const myInvitations = mapInvitations(user.myInvitations || [])

				state.friendList = user.friendList
				state.meInvitations = meInvitations
				state.myInvitations = myInvitations
			})
	}
})

export const { reducer: userReducer } = userSlice
export const { sortAnimeList } = userSlice.actions
