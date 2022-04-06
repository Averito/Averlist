import axios, { AxiosResponse } from 'axios'
import { API_URI } from 'variebles'
import { auth } from './myApi/auth'
import { anime } from './myApi/anime'
import { anilibria } from './anilibriaApi'

export const api = {
	token: '',
	setUserToken(newToken: string) {
		this.token = newToken
	},
	async get<T>(path: string) {
		const response = await axios.get<T>(API_URI + path, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		})
		return response.data
	},
	async post<T, B>(path: string, data: T) {
		const response = await axios.post<T, AxiosResponse<B>>(
			API_URI + path,
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
			API_URI + path,
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
		const response = await axios.delete<T>(API_URI + path, {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		})
		return response.data
	}
}
export const myApi = {
	auth,
	anime
}
export const anilibriaApi = anilibria
