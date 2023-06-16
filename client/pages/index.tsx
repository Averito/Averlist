import { GetStaticProps } from 'next'

import { Home } from '@pages/Home'
import { queryObjectByDefault } from '@anilibriaApi/anilibria'
import {
	getAnilibriaChanges,
	getAnilibriaSchedule,
	GetAnilibriaScheduleQueryParams,
	getAnilibriaUpdates,
	GetAnilibriaUpdatesQueryParams
} from 'anilibria-api-wrapper'

export default Home

export const getStaticProps: GetStaticProps = async () => {
	const objectParamsForSlider: GetAnilibriaUpdatesQueryParams = {
		filter: ['id', 'names', 'description', 'player', 'status', 'type', 'code'],
		limit: 5,
		playlist_type: 'array'
	}
	const objectParamsForSchedule: GetAnilibriaScheduleQueryParams = {
		filter: queryObjectByDefault.filter as string[],
		days: [0, 1, 2, 3, 4, 5, 6]
	}

	const { data: updatesTitleList } = await getAnilibriaUpdates(
		queryObjectByDefault
	)
	const { data: changesTitleList } = await getAnilibriaChanges(
		queryObjectByDefault
	)
	const { data: scheduleOfWeek } = await getAnilibriaSchedule(
		objectParamsForSchedule
	)
	const { data: firstFiveTitles } = await getAnilibriaUpdates(
		objectParamsForSlider
	)

	return {
		props: {
			updatesTitleList,
			changesTitleList,
			firstFiveTitles,
			scheduleOfWeek
		},
		revalidate: 60 * 60 * 24
	}
}
