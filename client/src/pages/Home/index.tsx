import { NextPage } from 'next'
import { Schedule, Title } from '@anilibriaApi/types'
import { MainAnimeSlider } from './components/MainAnimeSlider'
import { HomeMobile } from '@pages/Home/components/HomeMobile'
import { HomeDesktop } from '@pages/Home/components/HomeDesktop'
import { reverseArray } from '@helpers/reverseArray'

interface HomeProps {
	updatesTitleList: Title[]
	changesTitleList: Title[]
	firstFiveTitles: Title[]
	scheludeOfWeek: Schedule[]
}

export const Home: NextPage<HomeProps> = ({
	updatesTitleList,
	changesTitleList,
	firstFiveTitles,
	scheludeOfWeek
}) => {
	const reversedUpdatesTitleList = reverseArray(updatesTitleList)

	return (
		<div>
			{/* MainAnimeSlider only for desktop */}
			<MainAnimeSlider titleList={firstFiveTitles} />
			<HomeDesktop
				changesTitleList={changesTitleList}
				reversedUpdatesTitleList={reversedUpdatesTitleList}
				scheludeOfWeek={scheludeOfWeek}
			/>
			<HomeMobile titleList={changesTitleList} />
		</div>
	)
}
