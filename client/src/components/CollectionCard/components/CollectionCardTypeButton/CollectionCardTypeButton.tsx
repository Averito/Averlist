import { FC, MouseEventHandler } from 'react'
import cs from 'classnames'

import styles from './CollectionCardTypeButton.module.scss'
import collectionsStore from '@stores/collections.store'
import { CollectionType } from '@averlistApi/entities/collections/types'
import { CollectionCardTypeButtonProps } from './CollectionCardTypeButton.types'

export const CollectionCardTypeButton: FC<CollectionCardTypeButtonProps> = ({
	collectionType,
	collectionId
}) => {
	const onClickChangeCollectionType = (
		type: CollectionType
	): MouseEventHandler<HTMLButtonElement> => {
		return event => {
			event.stopPropagation()
			void collectionsStore.changeType(collectionId, type)
		}
	}

	const privateType = collectionType === CollectionType.PRIVATE
	const clickHandler = privateType
		? onClickChangeCollectionType(CollectionType.PUBLIC)
		: onClickChangeCollectionType(CollectionType.PRIVATE)

	return (
		<div className={styles.container}>
			<button
				className={cs(styles.access, {
					[styles.public]: !privateType,
					[styles.private]: privateType
				})}
				onClick={clickHandler}
			>
				{privateType ? CollectionType.PRIVATE : CollectionType.PUBLIC}
			</button>
		</div>
	)
}
