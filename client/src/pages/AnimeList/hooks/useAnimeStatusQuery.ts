import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { statusFilterOptions } from '@pages/AnimeList/statusFilterOptions'
import { SelectMenu } from '@components/Select'
import { Averlist } from '@averlistApi/types'
import AnimeStatus = Averlist.AnimeStatus
import AnimeStatusQuery = Averlist.AnimeStatusQuery

export const useAnimeStatusQuery = () => {
	const router = useRouter()

	const [selectedOption, setSelectedOption] = useState<
		SelectMenu<Averlist.AnimeStatus | null>
	>(statusFilterOptions[0])

	const routerPushModify = async (status: AnimeStatusQuery) => {
		await router.push(
			{
				pathname: '/lk/anime-list',
				query: {
					...router.query,
					status
				}
			},
			undefined,
			{ shallow: true }
		)
	}

	const onChangeSelect = (option: SelectMenu<Averlist.AnimeStatus | null>) => {
		return async () => {
			setSelectedOption(option)
			switch (option.value) {
				case AnimeStatus.VIEWED:
					await routerPushModify(AnimeStatusQuery.VIEWED)
					break
				case AnimeStatus.LOOK:
					await routerPushModify(AnimeStatusQuery.LOOK)
					break
				case AnimeStatus.PLANNED:
					await routerPushModify(AnimeStatusQuery.PLANNED)
					break
				case AnimeStatus.COMING_OUT:
					await routerPushModify(AnimeStatusQuery.COMING_OUT)
					break
				case AnimeStatus.RECONSIDERING:
					await routerPushModify(AnimeStatusQuery.RECONSIDERING)
					break
				case AnimeStatus.ABANDONED:
					await routerPushModify(AnimeStatusQuery.ABANDONED)
					break
				default:
					await routerPushModify(AnimeStatusQuery.ALL)
					break
			}
		}
	}

	useEffect(() => {
		const status = router.query.status as Averlist.AnimeStatusQuery

		switch (status) {
			case AnimeStatusQuery.VIEWED:
				setSelectedOption(statusFilterOptions[1])
				break
			case AnimeStatusQuery.LOOK:
				setSelectedOption(statusFilterOptions[2])
				break
			case AnimeStatusQuery.PLANNED:
				setSelectedOption(statusFilterOptions[3])
				break
			case AnimeStatusQuery.COMING_OUT:
				setSelectedOption(statusFilterOptions[4])
				break
			case AnimeStatusQuery.RECONSIDERING:
				setSelectedOption(statusFilterOptions[5])
				break
			case AnimeStatusQuery.ABANDONED:
				setSelectedOption(statusFilterOptions[6])
				break
			default:
				setSelectedOption(statusFilterOptions[0])
				break
		}
	}, [])

	return { selectedOption, onChangeSelect }
}
