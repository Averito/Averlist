import { FC } from 'react'

import styles from './styles.module.scss'
import { useAppSelector } from 'hooks/useAppSelector'
import { Dialog } from '../Dialog'
import { DialogDisplay } from '../DialogDisplay'
import { Typography } from 'antd'

export const ChatDesktop: FC = () => {
	const friendList = useAppSelector(state => state.user.friendList)

	return (
		<div className={styles.wrapper}>
			<div className={styles.friends}>
				{friendList.map(friend => (
					<Dialog key={friend._id} user={friend} />
				))}
				{friendList.length === 0 && (
					<Typography.Paragraph>У вас нет друзей(</Typography.Paragraph>
				)}
			</div>
			<DialogDisplay />
		</div>
	)
}
