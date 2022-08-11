import { NextPage } from 'next'
import { Schedule, Title } from '@anilibriaApi/types'
import { MainAnimeSlider } from './components/MainAnimeSlider'
import { HomeMobile } from '@pages/Home/components/HomeMobile'
import { HomeDesktop } from '@pages/Home/components/HomeDesktop'
import { reverseArray } from '@helpers/reverseArray'
import { useMemo } from 'react'

interface HomeProps {
	updatesTitleList: Title[]
	changesTitleList: Title[]
	firstFiveTitles: Title[]
	scheduleOfWeek: Schedule[]
}

export const Home: NextPage<HomeProps> = ({
	updatesTitleList,
	changesTitleList,
	firstFiveTitles,
	scheduleOfWeek
}) => {
	const reversedUpdatesTitleList = useMemo(
		() => reverseArray(updatesTitleList),
		[updatesTitleList]
	)

	return (
		<div>
			{/* MainAnimeSlider only for desktop */}
			<MainAnimeSlider titleList={firstFiveTitles} />
			<HomeDesktop
				changesTitleList={changesTitleList}
				reversedUpdatesTitleList={reversedUpdatesTitleList}
				scheduleOfWeek={scheduleOfWeek}
			/>
			<HomeMobile titleList={changesTitleList} />
		</div>
	)
}
