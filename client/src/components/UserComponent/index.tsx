import { FC } from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { User } from 'api/myApi/auth/types'
import { MY_AVATAR_URI } from 'variebles'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppSelector } from 'hooks/useAppSelector'
import { AddToFriends } from 'components/AddToFriends'

interface UserComponentProps {
	user: User
}

export const UserComponent: FC<UserComponentProps> = ({ user }) => {
	const { isMobile } = useWindowSize()

	const maxLingth = isMobile ? 30 : 100
	const userAvatar = user.avatar ? MY_AVATAR_URI + user.avatar : defaultAvatar

	const to = `/users/${user._id}`

	const currentUserId = useAppSelector(state => state.landing.userId)

	return (
		<div className={styles.user}>
			<Link to={to} className={styles.avatar}>
				<img src={userAvatar} alt='Ава' />
			</Link>
			<div>
				<Link className={styles.login} to={to}>
					{user.login.length > maxLingth
						? user.login.slice(0, maxLingth) + '...'
						: user.login}{' '}
					{user._id === currentUserId && '(Вы)'}
				</Link>
				<Typography.Paragraph style={{ margin: 0 }}>
					{user?.description?.length > maxLingth
						? user.description.slice(0, maxLingth) + '...'
						: user.description}
				</Typography.Paragraph>
				<AddToFriends size='small' invitedUserId={user._id} />
			</div>
		</div>
	)
}