import { FC } from 'react'
import { Button, ButtonProps, Popconfirm } from 'antd'

import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import {
	createInvitationThunk,
	removeFriendThunk,
	removeInvitationThunk
} from 'store/reducers/userReducer/userThunks'
import { Invitation } from 'api/myApi/invitation/types'

interface AddToFriendsProps {
	invitedUserId: string
	size?: ButtonProps['size']
}

export const AddToFriends: FC<AddToFriendsProps> = ({
	invitedUserId,
	size = 'middle'
}) => {
	const dispatch = useAppDispatch()

	const myId = useAppSelector(state => state.landing.userId)
	const checkFriend = useAppSelector(state =>
		state.user.friendList.find(friend => friend._id === invitedUserId)
	)
	const [wasSendedInvitation] = useAppSelector(state =>
		state.user.myInvitations.filter(
			invitation => invitation.invitedUser?._id === invitedUserId
		)
	)

	const me = myId === invitedUserId

	const onClickAddFriend = () => {
		const invitation: Invitation = {
			status: false,
			invitedUser: invitedUserId,
			senderUser: myId
		}

		dispatch(createInvitationThunk({ invitation, invitedUserId }))
	}
	const onClickRemoveInvitation = () => {
		dispatch(removeInvitationThunk(invitedUserId))
	}
	const onClickRemoveFriend = () => {
		dispatch(removeFriendThunk(invitedUserId))
	}

	if (me) {
		return <p />
	}

	if (checkFriend) {
		return (
			<Popconfirm
				title='Вы уверены, что хотите удалить этого пользователя из друзей?'
				onConfirm={onClickRemoveFriend}
				okText='Да'
				cancelText='Нет'
			>
				<Button size={size} type='primary' danger>
					Удалить из друзей
				</Button>
			</Popconfirm>
		)
	}

	if (wasSendedInvitation) {
		return (
			<Button size={size} onClick={onClickRemoveInvitation}>
				Отменить заявку
			</Button>
		)
	}

	return (
		<>
			<Button size={size} type='primary' onClick={onClickAddFriend}>
				Добавить в друзья
			</Button>
		</>
	)
}
