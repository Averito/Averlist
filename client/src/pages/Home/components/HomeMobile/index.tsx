import { FC, useCallback, useState } from 'react'

import styles from './HomeMobile.module.scss'
import { AnimeCard } from '@components/AnimeCard'
import { Title } from '@anilibriaApi/types'
import { anilibriaSSR, objectParamsByDefault } from '@anilibriaApi/anilibriaSSR'
import { useInfinityScroll } from '@hooks/useInfinityScroll'
import { uniqueIds } from '@helpers/uniqueIds'

interface HomeMobileProps {
	titleList: Title[]
}

export const HomeMobile: FC<HomeMobileProps> = ({ titleList }) => {
	const titleListCopyJson = JSON.parse(JSON.stringify(titleList)) as Title[]
	const [titleListCopy, setTitleListCopy] = useState<Title[]>(titleListCopyJson)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const pageSize = 30

	const onFetch = useCallback(async () => {
		const queryObject = {
			...objectParamsByDefault,
			limit: pageSize,
			after: pageSize * currentPage
		}

		const newTitles = await anilibriaSSR.getChanges(queryObject)

		setTitleListCopy(
			prevTitleList => uniqueIds([...prevTitleList, ...newTitles]) as Title[]
		)
		setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
	}, [currentPage])

	useInfinityScroll(onFetch)

	return (
		<div className={styles.mobileContent}>
			{titleListCopy.map(title => (
				<AnimeCard title={title} key={title.id} />
			))}
		</div>
	)
}
