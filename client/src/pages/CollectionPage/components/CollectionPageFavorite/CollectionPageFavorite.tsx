import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'

import styles from './CollectionPageFavorite.module.scss'
import favoriteCollectionsStore from '@stores/favoriteCollections.store'
import { CollectionPageFavoriteProps } from '@pages/CollectionPage/components/CollectionPageFavorite/CollectionPageFavorite.types'

export const CollectionPageFavorite: FC<CollectionPageFavoriteProps> = observer(
	({ collectionId }) => {
		const [inFavorite, setInFavorite] = useState<boolean>(
			favoriteCollectionsStore.isFavorite(collectionId)
		)

		const onClickUnFavoriteCollection = async () => {
			await favoriteCollectionsStore.unFavoriteCollection(collectionId)
			setInFavorite(false)
		}

		const onClickFavoriteCollection = async () => {
			await favoriteCollectionsStore.favoriteCollection(collectionId)
			setInFavorite(true)
		}

		return inFavorite ? (
			<AiFillHeart
				className={styles.cursorPointer}
				size={25}
				color='crimson'
				onClick={onClickUnFavoriteCollection}
			/>
		) : (
			<AiOutlineHeart
				className={styles.cursorPointer}
				size={25}
				color='crimson'
				onClick={onClickFavoriteCollection}
			/>
		)
	}
)
