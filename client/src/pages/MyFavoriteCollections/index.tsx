import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { NextPage } from 'next'

import styles from './MyFavoriteCollections.module.scss'
import { CollectionCard, Input } from '@components'
import { Averlist } from '@averlistApi/types'
import favoriteCollectionsStore from '@stores/favoriteCollections.store'
import { useInput } from '@hooks/useInput'
import { useProtectedRoute } from '@hooks/useProtectedRoute'
import userStore from '@stores/user.store'
import { MyFavoriteCollectionsProps } from '@pages/MyFavoriteCollections/MyFavoriteCollections.types'

export const MyFavoriteCollections: NextPage<MyFavoriteCollectionsProps> =
	observer(({ collections }) => {
		useProtectedRoute('/login', userStore.isAuth)

		useEffect(() => {
			favoriteCollectionsStore.setCollections(collections)
		}, [])

		const collectionsForIterate = favoriteCollectionsStore.collections.length
			? favoriteCollectionsStore.collections
			: collections

		const [searchValue, setSearchValue] = useInput()

		const filteredCollections = useMemo<Averlist.Collection[]>(
			() =>
				(collectionsForIterate || []).filter(collection =>
					collection.name.toLowerCase().includes(searchValue.toLowerCase())
				),
			[searchValue, collectionsForIterate]
		)

		return (
			<section className={styles.wrapper}>
				<div className={styles.container}>
					<Input
						width='100%'
						margin='0 0 15px 0'
						value={searchValue}
						onChange={setSearchValue}
						placeholder='Поиск'
					/>
					<div className={styles.collections}>
						{filteredCollections.length ? (
							filteredCollections.map(collection => (
								<CollectionCard key={collection.id} collection={collection} />
							))
						) : searchValue.length ? (
							<p>По вашему запросу ничего не найдено</p>
						) : (
							<p className={styles.collectionsLengthIs0}>
								У вас нет любимых коллекций
							</p>
						)}
					</div>
				</div>
			</section>
		)
	})
