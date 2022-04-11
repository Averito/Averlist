import axios, { AxiosResponse } from 'axios'

import { api } from 'api'
import { User, UserProperties, Login, Token } from './types'
import { MY_API_URI } from 'variebles'

export const auth = {
	async registration(user: User) {
		const response = await axios.post<User, AxiosResponse<User>>(
			MY_API_URI + '/registration',
			user
		)
		return response.data
	},
	async login(user: User) {
		const response = await axios.post<User, AxiosResponse<Login>>(
			MY_API_URI + '/auth',
			user
		)
		return response.data
	},
	async authCheck(token: string | null) {
		return await api.get<Token>('/auth-check')
	},
	async forgotPassword(user: UserProperties) {
		return await api.post<UserProperties, User>('/forgot-password', user)
	},
	async getUser() {
		const user = await api.get<User>(`/users/me`)
		return user
	}
}
