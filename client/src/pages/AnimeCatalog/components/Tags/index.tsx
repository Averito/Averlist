import { FC, memo, MouseEventHandler, useCallback } from 'react'
import { useRouter } from 'next/router'

import styles from './Tags.module.scss'
import { Tag } from '@components/Tag'

interface TagsProps {
	years: number[]
	genres: string[]
}

export const Tags: FC<TagsProps> = memo(({ years, genres }) => {
	const router = useRouter()

	const onClickTag = useCallback(
		(
			type: 'genres' | 'year',
			param: string
		): MouseEventHandler<HTMLSpanElement> => {
			return () => {
				const queryObject: Record<string, string> = {}

				if (!router.query[type]) queryObject[type] = ''
				const currentType = router.query[type] as string

				if (currentType && Array.isArray(currentType.split(','))) {
					const currentTypeValues = currentType.split(',')

					if (currentType.includes(param)) {
						queryObject[type] = currentTypeValues
							.filter(value => value !== param)
							.join(',')
					} else {
						queryObject[type] = [...currentTypeValues, param].join(',')
					}
				} else {
					if (!(currentType ?? '').includes(param)) {
						queryObject[type] = param
					}
				}

				if (type === 'year') {
					queryObject.genres = (router.query?.genres as string) ?? ''
				} else {
					queryObject.year = (router.query?.year as string) ?? ''
				}

				router.push(
					{
						query: queryObject
					},
					undefined,
					{ shallow: true }
				)
			}
		},
		[router]
	)

	return (
		<div className={styles.tags}>
			<div className={styles.years}>
				{years.map(year => {
					const yearStr = year.toString()
					const checked = router.query?.year?.includes(yearStr) || false

					return (
						<div key={year} className={styles.tagWrapper}>
							<Tag
								title={yearStr}
								checked={checked}
								onClick={onClickTag('year', yearStr)}
							/>
						</div>
					)
				})}
			</div>
			<div className={styles.genres}>
				{genres.map(genre => {
					const checked = router.query?.genres?.includes(genre) || false

					return (
						<div key={genre} className={styles.tagWrapper}>
							<Tag
								title={genre}
								checked={checked}
								onClick={onClickTag('genres', genre)}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
})
