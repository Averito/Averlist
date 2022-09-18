import { FC } from 'react'

import styles from './FavoriteCollections.module.scss'
import { Flex } from '@components/Flex'

export const FavoriteCollections: FC = () => {
	return (
		<Flex
			customClassName={styles.favoriteCollections}
			backgroundColor='#2b214f'
			width='100%'
			padding='15px'
			margin='15px 0 0 0'
		>
			Здесь будут ваши любимые коллекции
		</Flex>
	)
}
