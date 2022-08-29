import { Averlist } from '@averlistApi/types'
import { axios } from '@averlistApi/averlist'

export const invitations = {
	async my(): Promise<Averlist.Invitation[]> {
		const response = await axios.get<Averlist.Invitation[]>('/invitation/my')
		return response.data
	},
	async me(): Promise<Averlist.Invitation[]> {
		const response = await axios.get<Averlist.Invitation[]>('/invitation/me')
		return response.data
	},
	async send(invitedUserId: string): Promise<Averlist.Invitation> {
		const response = await axios.post<Averlist.Invitation>(`/invitation/send/${invitedUserId}`)
		return response.data
	},
	async accept(invitationId: string): Promise<Averlist.User> {
		const response = await axios.post<Averlist.User>(`/invitation/accept/${invitationId}`)
		return response.data
	},
	async remove(invitationId: string): Promise<Averlist.Invitation> {
		const response = await axios.delete<Averlist.Invitation>(`/invitation/${invitationId}`)
		return response.data
	}
}
