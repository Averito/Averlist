import { FC, MouseEventHandler } from 'react'
import { FaTrash } from 'react-icons/fa'

import styles from './CollectionCardRemoveButton.module.scss'
import collectionsStore from '@stores/collections.store'
import { CollectionCardRemoveButtonProps } from './CollectionCardRemoveButton.types'
import { ANIMATION_REMOVE_TIME_IN_MS } from '@components/CollectionCard/components/CollectionCardRemoveButton/CollectionCardRemoveButton.config'

export const CollectionCardRemoveButton: FC<
	CollectionCardRemoveButtonProps
> = ({ collectionId, onRemove }) => {
	const onClickTrashButton: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		onRemove()

		setTimeout(() => {
			void collectionsStore.removeCollection(collectionId)
		}, ANIMATION_REMOVE_TIME_IN_MS - 100)
	}

	return (
		<FaTrash className={styles.trash} size={18} onClick={onClickTrashButton} />
	)
}
