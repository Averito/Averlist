import React, {
	FC,
	memo,
	MouseEventHandler,
	useCallback,
	useEffect,
	useState
} from 'react'
import { useRouter } from 'next/router'

import styles from './Tags.module.scss'
import { Tag } from '@components/Tag'
import { StructuralResult } from '@sinclair/typebox/conditional'

interface TagsProps {
	years: number[]
	genres: string[]
}

export const Tags: FC<TagsProps> = memo(({ years, genres }) => {
	const router = useRouter()

	const [selectedYears, setSelectedYears] = useState<Set<string>>(
		new Set<string>()
	)
	const [selectedGenres, setSelectedGenres] = useState<Set<string>>(
		new Set<string>()
	)

	const onClickYearsTag = (
		value: string
	): MouseEventHandler<HTMLSpanElement> => {
		return () => {
			const newSelectedYears = new Set<string>(selectedYears)

			if (selectedYears.has(value)) {
				newSelectedYears.delete(value)
				setSelectedYears(newSelectedYears)
				return
			}

			newSelectedYears.add(value)
			setSelectedYears(newSelectedYears)
		}
	}

	const onClickGenresTag = (
		value: string
	): MouseEventHandler<HTMLSpanElement> => {
		return () => {
			const newSelectedGenres = new Set<string>(selectedGenres)

			if (selectedGenres.has(value)) {
				newSelectedGenres.delete(value)
				setSelectedGenres(newSelectedGenres)
				return
			}

			newSelectedGenres.add(value)
			setSelectedGenres(newSelectedGenres)
		}
	}

	useEffect(() => {
		if (router.query.years)
			setSelectedYears(
				new Set<string>((router.query.years as string).split(','))
			)
		if (router.query.genre)
			setSelectedGenres(
				new Set<string>((router.query.genre as string).split(','))
			)
	}, [])

	useEffect(() => {
		const query: Record<string, string> = {
			...router.query,
			years: Array.from(selectedYears).join(','),
			genre: Array.from(selectedGenres).join(',')
		}

		void router.push(
			{
				query
			},
			undefined,
			{ shallow: true }
		)
	}, [selectedYears, selectedGenres])

	return (
		<div className={styles.tags}>
			<div className={styles.years}>
				{years.map(year => {
					const yearStr = year.toString()
					const checked = selectedYears.has(yearStr)

					return (
						<div key={year} className={styles.tagWrapper}>
							<Tag
								title={yearStr}
								checked={checked}
								onClick={onClickYearsTag(yearStr)}
							/>
						</div>
					)
				})}
			</div>
			<div className={styles.genres}>
				{genres.map(genre => {
					const checked = selectedGenres.has(genre)

					return (
						<div key={genre} className={styles.tagWrapper}>
							<Tag
								title={genre}
								checked={checked}
								onClick={onClickGenresTag(genre)}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
})
