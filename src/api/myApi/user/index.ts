import { User, UserSafity } from '../auth/types'
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
	},
	async getAll() {
		const response = await api.get<{ count: number; users: UserSafity[] }>(
			'/users'
		)
		return response
	},
	async removeFriend(friendId: string) {
		return await api.delete<{ myId: string; friendId: string }>(
			`/users/me/friends/${friendId}`
		)
	}
}
