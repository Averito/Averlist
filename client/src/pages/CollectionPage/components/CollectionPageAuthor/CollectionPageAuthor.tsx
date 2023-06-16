import { FC } from 'react'
import Image from 'next/image'

import styles from './CollectionPageAuthor.module.scss'
import { CollectionPageAuthorProps } from './CollectionPageAuthor.types'
import { getCurrentAvatar } from '@helpers/getCurrentAvatar'

export const CollectionPageAuthor: FC<CollectionPageAuthorProps> = ({
	author
}) => {
	return (
		<div className={styles.authorContainer}>
			<Image
				className={styles.authorImg}
				width={25}
				height={25}
				src={getCurrentAvatar(author.avatar)}
			/>
			<p className={styles.authorName}>{author.name}</p>
		</div>
	)
}
