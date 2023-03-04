import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

import styles from './AnimePage.module.scss'
import { Series, Title } from '@anilibriaApi/types'
import { Meta } from '@components/Meta'
import { DropdownMenu } from '@components/Dropdown'
import { Averlist } from '@averlistApi/types'
import { averlist } from '@averlistApi/averlist'
import { errorToast, successToast } from '@helpers/toasts'
import { isAnimeDuplicate } from '@helpers/isAnimeDuplicate'
import { AnimePageMobile } from '@pages/AnimePage/components/AnimePageMobile'
import { AnimePageDesktop } from '@pages/AnimePage/components/AnimePageDesktop'
import animeListStore from '@stores/animeList.store'

const Device = dynamic(() => import('@components/Device'), { ssr: false })

interface AnimePageProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const AnimePage: NextPage<AnimePageProps> = ({ title }) => {
	const [animeList, setAnimeList] = useState<Averlist.Anime[]>([])

	const wrapperBackground = {
		background: `url("${ANILIBRIA_URI}${
			(title.player.playlist as Series)[
				Object.entries(title.player.playlist)[0][0]
			]?.preview
		}") 0 0/100% 100%`
	}

	const addToList = (title: Title, status: Averlist.AnimeStatus) => {
		return async () => {
			const newAnime: Averlist.NewAnime = {
				name: title.names.ru,
				anilibriaId: title.id,
				anilibriaCode: title.code,
				status,
				poster: `${ANILIBRIA_URI}${title.posters?.original?.url}`
			}
			const animeDuplicate = isAnimeDuplicate(newAnime)
			if (animeDuplicate)
				return errorToast('Данное аниме уже есть в вашем списке')

			const anime = await averlist.anime.create(newAnime)
			animeListStore.addToAnimeList(anime)
			successToast('Аниме успешно добавлено в ваш список!')
		}
	}

	useEffect(() => {
		const asyncWrapper = async () => {
			const animeList = await averlist.anime.getByAnilibriaId(title.id)
			setAnimeList(animeList)
		}
		asyncWrapper()
	}, [title.id])

	const dropdownOptions: DropdownMenu[] = [
		{
			id: 0,
			label: Averlist.AnimeStatus.VIEWED,
			onClick: addToList(title, Averlist.AnimeStatus.VIEWED)
		},
		{
			id: 1,
			label: Averlist.AnimeStatus.LOOK,
			onClick: addToList(title, Averlist.AnimeStatus.LOOK)
		},
		{
			id: 2,
			label: Averlist.AnimeStatus.PLANNED,
			onClick: addToList(title, Averlist.AnimeStatus.PLANNED)
		},
		{
			id: 3,
			label: Averlist.AnimeStatus.RECONSIDERING,
			onClick: addToList(title, Averlist.AnimeStatus.RECONSIDERING)
		},
		{
			id: 4,
			label: Averlist.AnimeStatus.COMING_OUT,
			onClick: addToList(title, Averlist.AnimeStatus.COMING_OUT)
		},
		{
			id: 5,
			label: Averlist.AnimeStatus.ABANDONED,
			onClick: addToList(title, Averlist.AnimeStatus.ABANDONED)
		}
	]

	return (
		<>
			<Meta
				title={`Averlist | ${title.names.ru}`}
				description={title.description}
				image={`${ANILIBRIA_URI}${title.posters.original.url}`}
			/>
			<div className={styles.wrapper} style={wrapperBackground}>
				<div className={styles.wrapperBackgroundFilter}>
					<div className={styles.container}>
						<Device>
							{({ isMobile }) => {
								if (isMobile) {
									return (
										<AnimePageMobile
											title={title}
											dropdownOptions={dropdownOptions}
											animeList={animeList}
										/>
									)
								}
								return (
									<AnimePageDesktop
										title={title}
										dropdownOptions={dropdownOptions}
										animeList={animeList}
									/>
								)
							}}
						</Device>
					</div>
				</div>
			</div>
		</>
	)
}
