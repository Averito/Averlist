import { FC } from 'react'

import styles from './styles.module.scss'
import { AnimeLibraryItem } from 'components/AnimeLibraryItem'
import { useAppSelector } from 'hooks/useAppSelector'
import { AnilibriaLoader } from 'components/Loader/loaderTypes/AnilibriaLoader'

export const ChangesOnAnilibria: FC = () => {
	const limit = 18

	const titleList = useAppSelector(state => state.landing.titleList)
	const titleListLoading = useAppSelector(
		state => state.landing.titleListLoading
	)

	return (
		<div className={styles.wrapper}>
			{titleListLoading && <AnilibriaLoader />}
			{titleList.slice(0, limit).map(title => (
				<AnimeLibraryItem title={title} key={title.id} />
			))}
		</div>
	)
}
