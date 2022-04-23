import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { useAppSelector } from 'hooks/useAppSelector'
import { MY_URI } from 'variebles'
import { Table } from './components/Table'

export const UserPage: FC = () => {
	const userId = useParams().userId

	const user = useAppSelector(
		state => state.users.users.filter(user => user._id === userId)[0]
	)

	const userAvatar = user.avatar ? MY_URI + user.avatar : defaultAvatar

	return (
		<div className={styles.profileWrapper}>
			<div className={styles.profile}>
				<div className={styles.profileItem1}>
					<div className={styles.nickname}>
						<p className={styles.title}>Никнейм:</p>
						<p className={styles.nicknameText}>{user.login}</p>
					</div>
					<div className={styles.description}>
						<p className={styles.title}>О себе:</p>
						<p className={styles.descriptionText}>
							{user.description || 'Не заполнено'}
						</p>
					</div>
				</div>
				<div className={styles.profileItem2}>
					<img
						className={styles.profileItem2Avatar}
						src={userAvatar}
						alt='Ава'
					/>
				</div>
			</div>
			<div className={styles.profileAnimeList}>
				<Table user={user} />
			</div>
		</div>
	)
}
