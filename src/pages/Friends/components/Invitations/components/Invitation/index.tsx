import { FC } from 'react'
import { Button, Tag } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { MY_URI } from 'variebles'
import { NormalInvitation } from 'api/myApi/invitation/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import {
	acceptInvitationThunk,
	declineInvitationThunk,
	removeInvitationThunk
} from 'store/reducers/userReducer/userThunks'

interface InvitationProps {
	invitation: NormalInvitation
	type: 'me' | 'my'
}

export const Invitation: FC<InvitationProps> = ({ invitation, type }) => {
	const dispatch = useAppDispatch()

	const userType = type === 'me' ? 'senderUser' : 'invitedUser'
	const { avatar, login, _id } = invitation[userType]

	const to = `/users/${_id}`

	const userAvatar = avatar ? MY_URI + avatar : defaultAvatar

	const onClickAcceptInvitation = () => {
		dispatch(acceptInvitationThunk(invitation._id))
	}
	const onClickDeclineInvitation = () => {
		dispatch(declineInvitationThunk(invitation._id))
	}

	const onClickRemoveInvitation = () => {
		dispatch(removeInvitationThunk(invitation.invitedUser._id as string))
	}

	return (
		<div className={styles.invitation}>
			<img className={styles.avatar} alt='Ава' src={userAvatar} />
			<Link to={to} style={{ margin: '0 0 5px 0' }}>
				{login}
			</Link>
			{type === 'me' ? (
				<>
					<Button
						size='small'
						type='primary'
						style={{ margin: '0 0 5px 0' }}
						onClick={onClickAcceptInvitation}
					>
						Принять
					</Button>
					<Button
						size='small'
						type='primary'
						danger
						onClick={onClickDeclineInvitation}
					>
						Отклонить
					</Button>
				</>
			) : (
				<>
					<Tag color='volcano' style={{ margin: '0 0 5px 0' }}>
						Ожидает
					</Tag>
					<Button size='small' onClick={onClickRemoveInvitation}>
						Отмена
					</Button>
				</>
			)}
		</div>
	)
}
