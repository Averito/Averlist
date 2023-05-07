import { Observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from './LK.module.scss'
import { Meta } from '@components/Meta'
import { Avatar } from '@pages/LK/components/Avatar'
import { AnimeListStats } from '@components'
import { FavoriteCollections } from '@pages/LK/components/FavoriteCollections'
import userStore from '@stores/user.store'
import { Flex } from '@components/Flex'
import { Averlist } from '@averlistApi/types'
import { useProtectedRoute } from '@hooks/useProtectedRoute'

export const LK: NextPage = () => {
	useProtectedRoute('/', userStore.isAuth)

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
									backgroundColor='#2b214f'
									padding='15px'
									animeList={userStore.user.anime_list || []}
								/>
							)}
						</Observer>
						<Avatar />
					</div>
					<Flex gap='15px' margin='15px 0 0 0'>
						<Link
							href={`/lk/anime-list?status=${Averlist.AnimeStatusQuery.ALL}`}
						>
							<p className={styles.linkBlock}>Аниме список</p>
						</Link>
						<Link href='/lk/collections'>
							<p className={styles.linkBlock}>Мои коллекции</p>
						</Link>
					</Flex>
					<FavoriteCollections />
				</div>
			</div>
		</>
	)
}
