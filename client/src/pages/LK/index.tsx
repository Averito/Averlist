import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'

import styles from './LK.module.scss'
import { Averlist } from '@averlistApi/types'
import { Meta } from '@utils/Meta'
import authStore from '@stores/auth.store'
import { useAuth } from '@hooks/useAuth'
import { Avatar } from '@pages/LK/components/Avatar'

interface LKProps {
	me: Averlist.User
}

export const LK: NextPage<LKProps> = observer(({ me }) => {
	useAuth()

	const currentAvatar = authStore.currentAvatar
	const currentName = authStore.currentName

	return (
		<>
			<Meta
				title='Averlist | Личный кабинет'
				description='Личный кабинет. Чувствуйте себя как дома, Господин.'
			/>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.mainBlock}>
						<div className={styles.stats}>Статы</div>
						<Avatar avatar={currentAvatar} name={currentName} />
					</div>
					<div className={styles.favoriteCollections}></div>
				</div>
			</div>
		</>
	)
})
