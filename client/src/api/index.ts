import axios, { AxiosResponse } from 'axios'
import { MY_API_URI } from 'variebles'
import { anilibria } from './anilibriaApi'
import { auth } from './myApi/auth'
import { anime } from './myApi/anime'
import { user } from './myApi/user'
import { invitation } from './myApi/invitation'
import { news } from './myApi/news'

export const api = {
	token: '',
	setUserToken(newToken: string) {
		this.token = newToken
	},
	async get<T>(path: string) {
		const response = await axios.get<T>(MY_API_URI + path, {
			headers: {
				Authorization: `Bearer ${this.token || localStorage.getItem('token')}`
			}
		})
		return response.data
	},
	async post<T, B>(path: string, data: T) {
		const response = await axios.post<T, AxiosResponse<B>>(
			MY_API_URI + path,
			data,
			{
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			}
		)
		return response.data
	},
	async put<T, B>(path: string, data: T) {
		const response = await axios.put<T, AxiosResponse<B>>(
			MY_API_URI + path,
			data,
			{
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			}
		)
		return response.data
	},
	async delete<T>(path: string) {
		const response = await axios.delete<T>(MY_API_URI + path, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		})
		return response.data
	}
}
export const myApi = {
	auth,
	anime,
	user,
	invitation,
	news
}
export const anilibriaApi = anilibria
