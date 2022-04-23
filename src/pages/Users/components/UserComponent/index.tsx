import { FC } from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { UserSafity } from 'api/myApi/auth/types'
import { MY_URI } from 'variebles'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppSelector } from 'hooks/useAppSelector'

interface UserComponentProps {
	user: UserSafity
}

export const UserComponent: FC<UserComponentProps> = ({ user }) => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	const maxLingth = isMobile ? 30 : 100
	const userAvatar = user.avatar ? MY_URI + user.avatar : defaultAvatar

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
					{user.description.length > maxLingth
						? user.description.slice(0, maxLingth) + '...'
						: user.description}
				</Typography.Paragraph>
			</div>
		</div>
	)
}
