import { FC, memo, MouseEventHandler } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import styles from './CollectionCard.module.scss'
import { CollectionCardProps } from './CollectionCard.types'
import { CollectionType } from '@averlistApi/entities/collections/types'
import collectionsStore from '@stores/collections.store'
import favoriteCollectionsStore from '@stores/favoriteCollections.store'
import { Flex } from '@components'
import { getCurrentAvatar } from '@helpers/getCurrentAvatar'
import { Observer } from 'mobx-react-lite'

const NEXT_PUBLIC_AVERLIST_POSTERS_URI =
	process.env.NEXT_PUBLIC_AVERLIST_POSTERS_URI

export const CollectionCard: FC<CollectionCardProps> = memo(
	({ collection, myPage }) => {
		const router = useRouter()

		const posterSource = `${NEXT_PUBLIC_AVERLIST_POSTERS_URI}${collection.poster}`

		const collectionHref = `/collections/${collection.id}`
		const onClickLocal = () => {
			void router.push(collectionHref)
		}

		const onClickChangeCollectionType = (
			type: CollectionType
		): MouseEventHandler<HTMLParagraphElement> => {
			return event => {
				event.stopPropagation()
				void collectionsStore.changeType(collection.id, type)
			}
		}

		const onClickUnFavoriteCollection = () => {
			void favoriteCollectionsStore.unFavoriteCollection(collection.id)
		}

		const onClickFavoriteCollection = () => {
			void favoriteCollectionsStore.favoriteCollection(collection.id)
		}

		return (
			<div className={styles.wrapper} onClick={onClickLocal}>
				<Image src={posterSource} layout='fill' alt='Постер' />
				<p className={styles.title}>
					<Link href={collectionHref}>{collection.name}</Link>
				</p>
				<Flex className={styles.animeList}>
					{(collection.anime_list || [])
						.filter(({ anime }) => !!anime.anilibriaId)
						.slice(0, 10)
						.map(({ anime }) => (
							<div key={anime?.id} className={styles.animeListImageWrapper}>
								<Image
									className={styles.animeListImage}
									src={anime?.poster || ''}
									layout='fill'
									alt='Постер'
								/>
							</div>
						))}
				</Flex>
				<div className={styles.shadow} />
				{!myPage && (
					<Flex className={styles.byUser} alignItems='center'>
						<Image
							src={getCurrentAvatar(collection.createdBy.avatar)}
							width={30}
							height={30}
							alt='Аватарка'
							className={styles.byUserAvatar}
						/>
						<p className={styles.byUserNickname}>{collection.createdBy.name}</p>
					</Flex>
				)}
				{myPage && (collection.favoritesBy || []).length > 0 && (
					<div className={styles.favoriteCounter}>
						<div>
							<AiFillHeart size={45} color='crimson' />
							<p className={styles.favoriteCounterText}>
								{collection.favoritesBy?.length}
							</p>
						</div>
					</div>
				)}
				{myPage ? (
					<>
						{collection.type === CollectionType.PRIVATE ? (
							<p
								className={styles.privateAccess}
								onClick={onClickChangeCollectionType(CollectionType.PUBLIC)}
							>
								Приватная
							</p>
						) : (
							<p
								className={styles.publicAccess}
								onClick={onClickChangeCollectionType(CollectionType.PRIVATE)}
							>
								Публичная
							</p>
						)}
					</>
				) : (
					<Observer>
						{() => (
							<>
								{favoriteCollectionsStore.isFavorite(collection.id) ? (
									<AiFillHeart
										className={styles.favoriteCollection}
										size={25}
										color='crimson'
										onClick={onClickUnFavoriteCollection}
									/>
								) : (
									<AiOutlineHeart
										className={styles.unfavoriteCollection}
										size={25}
										color='crimson'
										onClick={onClickFavoriteCollection}
									/>
								)}
							</>
						)}
					</Observer>
				)}
			</div>
		)
	}
)
