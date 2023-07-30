import { NextPage } from 'next'
import Image from 'next/image'

import styles from './CollectionPage.module.scss'
import { CollectionPageProps } from '@pages/CollectionPage/CollectionPage.types'
import { Meta, Description } from '@components'
import {
	CollectionPageAnimeList,
	CollectionPageAuthor,
	CollectionPageFavorite,
	CollectionPageName
} from '@pages/CollectionPage/components'
import collectionsStore from '@stores/collections.store'
import { Observer } from 'mobx-react-lite'

const NEXT_PUBLIC_AVERLIST_POSTERS_URI =
	process.env.NEXT_PUBLIC_AVERLIST_POSTERS_URI

export const CollectionPage: NextPage<CollectionPageProps> = ({
	collection
}) => {
	return (
		<>
			<Meta
				title={`Averlist | Коллекция ${collection.name}`}
				description='Сборник счастья'
			/>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<div className={styles.containerHeader}>
						<Description.Container className={styles.descriptionContainer}>
							<Description.Property className={styles.property}>
								<Description.Key>Название:</Description.Key>
								<Description.Value>
									<CollectionPageName
										collectionId={collection.id}
										collectionName={collection.name}
									/>
								</Description.Value>
							</Description.Property>
							<Description.Property className={styles.property}>
								<Description.Key>Автор:</Description.Key>
								<Description.Value>
									<CollectionPageAuthor author={collection.createdBy} />
								</Description.Value>
							</Description.Property>
							<Description.Property className={styles.property}>
								<Description.Key>Избранное:</Description.Key>
								<Description.Value>
									<CollectionPageFavorite collectionId={collection.id} />
								</Description.Value>
							</Description.Property>

							<Observer>
								{() => {
									const isMyCollection = collectionsStore.collections.some(
										myCollection => myCollection.id === collection.id
									)

									return (
										<>
											{isMyCollection && (
												<Description.Property className={styles.property}>
													<Description.Key>В избранном у:</Description.Key>
													<Description.Value>
														{collection.favoritesBy?.length} человек
													</Description.Value>
												</Description.Property>
											)}
										</>
									)
								}}
							</Observer>

							<Description.Property className={styles.property}>
								<Description.Key>Всего аниме:</Description.Key>
								<Description.Value>
									{collection.anime_list.length}
								</Description.Value>
							</Description.Property>
						</Description.Container>
						<div className={styles.posterContainer}>
							<Image
								className={styles.poster}
								src={`${NEXT_PUBLIC_AVERLIST_POSTERS_URI}${collection.poster}`}
								layout='fill'
								alt='Постер'
							/>
						</div>
					</div>
					<CollectionPageAnimeList
						animeList={collection.anime_list.map(animeList => animeList.anime)}
					/>
				</div>
			</div>
		</>
	)
}
