import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import classnames from 'classnames'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { MY_AVATAR_URI } from 'variebles'
import {
	setChatViewType,
	setCurrentDialogMember
} from 'store/reducers/chatReducer'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useWindowSize } from 'hooks/useWindowSize'
import { User } from 'api/myApi/auth/types'

export const DialogDisplay: FC = () => {
	const { isMobile } = useWindowSize()

	const dispatch = useAppDispatch()

	const friendList = useAppSelector(state => state.user.friendList)
	const currentDialogMember = useAppSelector(
		state => state.chat.currentDialogMember
	)

	useEffect(() => {
		const [firstFriend] = friendList
		if (!currentDialogMember.login && firstFriend) {
			dispatch(setCurrentDialogMember(firstFriend))
		}
	}, [dispatch, currentDialogMember, friendList])

	const { avatar, login, _id } = currentDialogMember

	const onClickBackArrow = () => {
		dispatch(setCurrentDialogMember({} as User))
		dispatch(setChatViewType('main'))
	}

	const to = `/users/${_id}`

	const currentAvatar = avatar ? MY_AVATAR_URI + avatar : defaultAvatar

	return (
		<div
			className={classnames(
				styles.dialogDisplay,
				isMobile
					? styles.dialogDisplayHeightMobile
					: styles.dialogDisplayHeightDesktop
			)}
		>
			{friendList.length !== 0 && (
				<div className={styles.header}>
					<div className={styles.headerAvatarAndLogin}>
						<Link to={to}>
							<img className={styles.avatar} alt='Ава' src={currentAvatar} />
						</Link>
						<Link to={to}>{login}</Link>
					</div>
					{isMobile && (
						<LeftOutlined
							className='myIcon'
							style={{ fontSize: '23px' }}
							onClick={onClickBackArrow}
						/>
					)}
				</div>
			)}
			<Typography.Title level={1}>Чат в разработке...</Typography.Title>
		</div>
	)
}
