import { NextPage } from 'next'
import { Observer } from 'mobx-react-lite'

import styles from './LK.module.scss'
import { Meta } from '@utils/Meta'
import { useAuth } from '@hooks/useAuth'
import { Avatar } from '@pages/LK/components/Avatar'
import { AnimeListStats } from '@components/AnimeListStats'
import { FavoriteCollections } from '@pages/LK/components/FavoriteCollections'
import userStore from '@stores/user.store'

export const LK: NextPage = () => {
	return (
		<>
			<Meta
				title='Averlist | Личный кабинет'
				description='Личный кабинет. Чувствуйте себя как дома, Господин.'
			/>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.mainBlock}>
						<Observer>
							{() => (
								<AnimeListStats
									backgroundColor={'#2b214f'}
									padding='15px'
									animeList={userStore.user.anime_list || []}
								/>
							)}
						</Observer>
						<Avatar />
					</div>
					<FavoriteCollections />
				</div>
			</div>
		</>
	)
}
