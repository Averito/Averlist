import { FC } from 'react'
import { Typography } from 'antd'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { User } from 'api/myApi/auth/types'
import { MY_AVATAR_URI } from 'variebles'
import { useAppDispatch } from 'hooks/useAppDispatch'
import {
	setChatViewType,
	setCurrentDialogMember
} from 'store/reducers/chatReducer'
import { useWindowSize } from 'hooks/useWindowSize'

interface DialogProps {
	user: User
}

export const Dialog: FC<DialogProps> = ({ user }) => {
	const { isMobile } = useWindowSize()

	const maxLingth = 25

	const dispatch = useAppDispatch()

	const onClickDialog = () => {
		if (isMobile) {
			dispatch(setChatViewType('dialog'))
		}
		dispatch(setCurrentDialogMember(user))
	}

	const userAvatar = user.avatar ? MY_AVATAR_URI + user.avatar : defaultAvatar

	return (
		<div className={styles.user} onClick={onClickDialog}>
			<img className={styles.avatar} src={userAvatar} alt='Ава' />
			<div>
				<Typography.Paragraph className={styles.login} style={{ margin: 0 }}>
					{user.login.length > maxLingth
						? user.login.slice(0, maxLingth) + '...'
						: user.login}
				</Typography.Paragraph>
				<Typography.Paragraph style={{ margin: 0 }}>
					Последнее сообщение...
				</Typography.Paragraph>
			</div>
		</div>
	)
}
