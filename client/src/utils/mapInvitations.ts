import {
	InvitationWithUsers,
	NormalInvitation
} from 'api/myApi/invitation/types'

export const mapInvitations = (
	invitations: InvitationWithUsers[]
): NormalInvitation[] => {
	return invitations?.map(invitation => ({
		...invitation,
		senderUser: invitation.senderUser[0],
		invitedUser: invitation.invitedUser[0]
	}))
}
