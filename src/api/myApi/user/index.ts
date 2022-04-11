import { User } from '../auth/types'
import { api } from 'api'
import { LoginAndDescription } from 'types'

export const user = {
	async setAvatar(newAvatar: File) {
		const formData = new FormData()
		formData.append('avatar', newAvatar)

		const response = await api.post<FormData, User>(
			'/users/me/avatar',
			formData
		)

		return response
	},
	async edit(editedData: LoginAndDescription) {
		const response = await api.put<LoginAndDescription, User>(
			'/users/me',
			editedData
		)
		return response
	}
}
