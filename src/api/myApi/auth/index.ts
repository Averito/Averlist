import axios, { AxiosResponse } from 'axios'

import { api } from 'api'
import { User, UserProperties, Login, Token } from './types'
import { API_URI } from 'variebles'

export const auth = {
	async registration(user: User) {
		const response = await axios.post<User, AxiosResponse<User>>(
			API_URI + '/users/registration',
			user
		)
		return response.data
	},
	async login(user: User) {
		const response = await axios.post<User, AxiosResponse<Login>>(
			API_URI + '/auth',
			user
		)
		return response.data
	},
	async authCheck(token: string | null) {
		return await api.get<Token>('/auth-check')
	},
	async forgotPassword(user: UserProperties) {
		return await api.post<UserProperties, User>('/users/forgot-password', user)
	},
	async getUser(userId: string) {
		const [user] = await api.get<User[]>(`/users/${userId}`)
		return user
	}
}
