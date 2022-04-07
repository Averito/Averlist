import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { useWindowSize } from 'hooks/useWindowSize'
import { AnimePageMobile } from './components/AnimePageMobile'
import { AnimePageDesktop } from './components/AnimePageDesktop'
import { decodeAnimeName } from 'helpers/decodeAnimeName'
import { useAppSelector } from 'hooks/useAppSelector'
import { Status } from 'api/myApi/anime/types'
import { anilibriaApi } from 'api'
import { Title } from 'api/anilibriaApi/types'

export const AnimePage: FC = () => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	const titleName = decodeAnimeName(useParams().titleName as string)

	const animeList = useAppSelector(state => state.user.animeList)
	const searchTitle = useAppSelector(
		state =>
			state.landing.titleList.filter(
				title =>
					title.names.ru.trim() === titleName ||
					title.names.en.trim() === titleName
			)[0]
	)

	const { data: titleMain } = useQuery<Title>(
		['getTitle', titleName, searchTitle],
		() => anilibriaApi.getTitle({ id: searchTitle?.id })
	)
	const [currentStatus, setCurrentStatus] = useState<Status | -1>(-1)

	useEffect(() => {
		const currentStatusForState = animeList.filter(
			anime => anime.name.trim() === titleName
		)[0]?.status
		if (
			((currentStatusForState as Status | -1) !== -1 &&
				currentStatusForState) ||
			currentStatusForState === 0
		) {
			setCurrentStatus(currentStatusForState)
		} else {
			setCurrentStatus(-1)
		}

		return () => {
			setCurrentStatus(-1)
		}
	}, [animeList, titleName])

	return isMobile ? (
		<AnimePageMobile
			titleMain={titleMain as Title}
			currentStatus={currentStatus}
		/>
	) : (
		<AnimePageDesktop
			titleMain={titleMain as Title}
			currentStatus={currentStatus}
		/>
	)
}
