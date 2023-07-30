import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'
import { FC, MouseEventHandler } from 'react'

import styles from './CollectionCardFavoriteButton.module.scss'
import favoriteCollectionsStore from '@stores/favoriteCollections.store'
import { CollectionCardFavoriteButtonProps } from './CollectionCardFavoriteButton.types'

export const CollectionCardFavoriteButton: FC<CollectionCardFavoriteButtonProps> =
	observer(({ collectionId }) => {
		const onClickUnFavoriteCollection: MouseEventHandler<
			SVGElement
		> = event => {
			event.stopPropagation()
			void favoriteCollectionsStore.unFavoriteCollection(collectionId)
		}

		const onClickFavoriteCollection: MouseEventHandler<SVGElement> = event => {
			event.stopPropagation()
			void favoriteCollectionsStore.favoriteCollection(collectionId)
		}

		return favoriteCollectionsStore.collections.some(
			collection => collection.id === collectionId
		) ? (
			<AiFillHeart
				className={styles.favoriteCollection}
				size={25}
				color='crimson'
				onClick={onClickUnFavoriteCollection}
			/>
		) : (
			<AiOutlineHeart
				className={styles.unFavoriteCollection}
				size={25}
				color='crimson'
				onClick={onClickFavoriteCollection}
			/>
		)
	})
