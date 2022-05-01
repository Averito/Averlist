import { FC } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { MY_URI } from 'variebles'
import { NormalInvitation } from 'api/myApi/invitation/types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import {
	acceptInvitationThunk,
	declineInvitationThunk
} from 'store/reducers/userReducer/userThunks'

interface InvitationProps {
	invitation: NormalInvitation
}

export const Invitation: FC<InvitationProps> = ({ invitation }) => {
	const dispatch = useAppDispatch()

	const { avatar, login, _id } = invitation.senderUser

	const to = `/users/${_id}`

	const userAvatar = avatar ? MY_URI + avatar : defaultAvatar

	const onClickAcceptInvitation = () => {
		dispatch(acceptInvitationThunk(invitation._id))
	}
	const onClickDeclineInvitation = () => {
		dispatch(declineInvitationThunk(invitation._id))
	}

	return (
		<div className={styles.invitation}>
			<img className={styles.avatar} alt='Ава' src={userAvatar} />
			<Link to={to} style={{ margin: '0 0 5px 0' }}>
				{login}
			</Link>
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
		</div>
	)
}
