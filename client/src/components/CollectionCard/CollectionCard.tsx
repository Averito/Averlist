import { FC, memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'

import styles from './CollectionCard.module.scss'
import { CollectionCardProps } from './CollectionCard.types'
import { Flex } from '@components'
import { getCurrentAvatar } from '@helpers/getCurrentAvatar'
import {
	CollectionCardFavoriteButton,
	CollectionCardRemoveButton,
	CollectionCardTypeButton
} from '@components/CollectionCard/components'
import cs from 'classnames'

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

		const [isToRemove, setIsToRemove] = useState<boolean>(false)
		const onRemoveLocal = () => {
			setIsToRemove(true)
		}

		return (
			<div
				className={cs(styles.wrapper, { [styles.toRemove]: isToRemove })}
				onClick={onClickLocal}
			>
				<Image
					src={posterSource}
					layout='fill'
					alt='Постер'
					objectFit='cover'
				/>
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
					<CollectionCardTypeButton
						collectionId={collection.id}
						collectionType={collection.type}
					/>
				) : (
					<CollectionCardFavoriteButton collectionId={collection.id} />
				)}
				{myPage && (
					<CollectionCardRemoveButton
						collectionId={collection.id}
						onRemove={onRemoveLocal}
					/>
				)}
			</div>
		)
	}
)
