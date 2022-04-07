import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Title } from 'api/anilibriaApi/types'
import { api } from 'api'
import {
	loginThunk,
	forgotPasswordThunk,
	registrationThunk,
	authCheckThunk,
	getUpdatesThunk
} from './landingThunks'
import { errorMessage, successMessage, warningMessage } from 'helpers/messages'

const landingSlice = createSlice({
	name: 'landing',
	initialState: {
		userId: '',
		isAuth: Boolean(localStorage.getItem('isAuth') === 'true') || false,
		titleList: [] as Title[],
		titleListLoading: true,
		randomTitle: {} as Title,
		autoCompleteOptions: [] as Array<{ value: string }>,
		isAdult: false,
		registrationComplete: false,
		forgotPasswordComplete: false
	},
	reducers: {
		setAdult(state, { payload }: PayloadAction<boolean>) {
			state.isAdult = payload
		},
		logout(state) {
			state.isAuth = false
			state.isAdult = false
			state.userId = ''
			localStorage.setItem('token', '')
			localStorage.setItem('isAuth', 'false')
		},
		setRandomTitle(state) {
			const randomIdx = Math.floor(Math.random() * state.titleList.length)
			state.randomTitle = state.titleList[randomIdx]
		},
		setAutoCompleteOption(
			state,
			{ payload }: PayloadAction<Array<{ value: string }>>
		) {
			state.autoCompleteOptions = payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginThunk.fulfilled, (state, { payload }) => {
				const { access_token: accessToken, userId } = payload

				successMessage('Ну всё, теперь твои данные у меня')
				api.setUserToken(accessToken)
				localStorage.setItem('token', accessToken)
				localStorage.setItem('isAuth', 'true')
				state.userId = userId
				state.isAuth = true
			})
			.addCase(loginThunk.pending, state => {
				warningMessage('Ворую данные... 👀')
			})
			.addCase(loginThunk.rejected, state => {
				errorMessage('Это не те данные, подумай ещё')
			})
			.addCase(registrationThunk.fulfilled, state => {
				state.registrationComplete = true
			})
			.addCase(registrationThunk.rejected, state => {
				errorMessage('Такой пользователь уже существует!')
				state.registrationComplete = false
			})
			.addCase(authCheckThunk.fulfilled, (state, { payload }) => {
				localStorage.setItem('isAuth', 'true')
				state.isAuth = true
				state.userId = payload.id
			})
			.addCase(authCheckThunk.rejected, state => {
				errorMessage('Не авторизован')
				localStorage.setItem('token', '')
				localStorage.setItem('isAuth', 'false')
				state.isAuth = false
			})
			.addCase(forgotPasswordThunk.fulfilled, state => {
				state.forgotPasswordComplete = true
			})
			.addCase(forgotPasswordThunk.rejected, state => {
				errorMessage('Проверьте введённые данные!')
				state.forgotPasswordComplete = false
			})
			.addCase(getUpdatesThunk.fulfilled, (state, { payload }) => {
				state.titleListLoading = false
				const randomIdx = Math.floor(Math.random() * state.titleList.length)
				state.titleList = payload
				state.randomTitle = payload[randomIdx]
			})
			.addCase(getUpdatesThunk.rejected, state => {
				state.titleListLoading = false
				errorMessage(
					'Не удалось подключиться к серверу анилибрии, попробуйте перезагрузить страницу'
				)
			})
	}
})

export const { reducer: landingReducer } = landingSlice
export const { setAdult, logout, setRandomTitle, setAutoCompleteOption } =
	landingSlice.actions
