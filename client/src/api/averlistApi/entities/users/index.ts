import { axios } from '@averlistApi/averlist'
import { Averlist } from '@averlistApi/types'
import { queryParamsString } from '@helpers/queryParamsString'

export const users = {
	async all(
		limit: number = 15,
		page: number = 1,
		accessToken = ''
	): Promise<Averlist.User[]> {
		const queryString = queryParamsString({ limit, page })
		const response = await axios.get<Averlist.User[]>(
			`/users/all${queryString}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
		return response.data
	},
	async me(accessToken = ''): Promise<Averlist.User> {
		const response = await axios.get<Averlist.User>('users/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		return response.data
	},
	async editName(name: string): Promise<Averlist.User> {
		const response = await axios.patch<Averlist.User>('users/me/edit-name', {
			name
		})
		return response.data
	},
	async editAvatar(avatar: File): Promise<Averlist.User> {
		const formData = new FormData()
		formData.set('avatar', avatar)

		const response = await axios.patch<Averlist.User>(
			'users/me/avatar',
			formData
		)
		return response.data
	},
	async removeFriend(friendId: string): Promise<Averlist.User> {
		const response = await axios.delete<Averlist.User>(
			`users/remove-friend/${friendId}`
		)
		return response.data
	}
}
