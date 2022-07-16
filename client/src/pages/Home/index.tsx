import { NextPage } from 'next'
import { Schedule, Title } from '@anilibriaApi/types'
import { MainAnimeSlider } from './components/MainAnimeSlider'
import { usePropsOnClient } from '@pages/Home/hooks/usePropsOnClient'
import { HomeMobile } from '@pages/Home/components/HomeMobile'
import { HomeDesktop } from '@pages/Home/components/HomeDesktop'

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
	const {
		newFirstFiveTitles,
		newScheludeOfWeek,
		newChangesTitleList,
		reversedUpdatesTitleList
	} = usePropsOnClient(
		updatesTitleList,
		changesTitleList,
		firstFiveTitles,
		scheludeOfWeek
	)

	return (
		<div>
			{/* MainAnimeSlider only for desktop */}
			<MainAnimeSlider titleList={newFirstFiveTitles} />
			<HomeDesktop
				changesTitleList={newChangesTitleList}
				reversedUpdatesTitleList={reversedUpdatesTitleList}
				scheludeOfWeek={newScheludeOfWeek}
			/>
			<HomeMobile titleList={newChangesTitleList} />
		</div>
	)
}
