import { api } from 'api'
import { Invitation, AcceptInvitationResponse, NormalInvitation } from './types'
import { User } from '../auth/types'

type InvitationCreate = { invitation: Invitation; invitedUserId: string }

export const invitation = {
	async getAll() {
		return await api.get<[User]>('/invitation')
	},
	async create({ invitation, invitedUserId }: InvitationCreate) {
		return await api.post<Invitation, NormalInvitation>(
			`/invitation/${invitedUserId}`,
			invitation
		)
	},
	async delete(invitedUserId: string) {
		await api.delete<Invitation>(`/invitation/${invitedUserId}`)
		return invitedUserId
	},
	async accept(invitationId: string) {
		return await api.get<AcceptInvitationResponse>(
			`/invitation/accept/${invitationId}`
		)
	},
	async decline(invitationId: string) {
		await api.delete<Invitation>(`/invitation/decline/${invitationId}`)
		return invitationId
	}
}
