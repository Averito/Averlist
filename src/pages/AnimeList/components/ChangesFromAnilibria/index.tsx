import { FC } from 'react'

import styles from './styles.module.scss'
import { AnimeLibraryItem } from 'components/AnimeLibraryItem'
import { useAppSelector } from 'hooks/useAppSelector'

export const ChangesOnAnilibria: FC = () => {
	const limit = 18

	const titleList = useAppSelector(state => state.landing.titleList)

	return (
		<div className={styles.wrapper}>
			{titleList.slice(0, limit).map(title => (
				<AnimeLibraryItem title={title} key={title.id} />
			))}
		</div>
	)
}
