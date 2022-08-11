import { GetStaticProps } from 'next'

import { Home } from '@pages/Home'
import { QueryObject } from '@helpers/queryParamsString'
import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'

export default Home

export const getStaticProps: GetStaticProps = async () => {
	const objectParamsForSlider: QueryObject = {
		filter: ['id', 'names', 'description', 'player', 'status', 'type', 'code'],
		limit: 5
	}
	const objectParamsForSchedule: QueryObject = {
		filter: queryObjectByDefault.filter
	}
	const days = [0, 1, 2, 3, 4, 5, 6]

	const updatesTitleList = await anilibria.getUpdates(queryObjectByDefault)
	const changesTitleList = await anilibria.getChanges(queryObjectByDefault)
	const scheduleOfWeek = await anilibria.getSchedule(
		objectParamsForSchedule,
		days
	)
	let firstFiveTitles = await anilibria.getChanges(objectParamsForSlider)
	firstFiveTitles = firstSeriesToSeriesUsually(firstFiveTitles, 5)

	return {
		props: {
			updatesTitleList,
			changesTitleList,
			firstFiveTitles,
			scheduleOfWeek
		},
		revalidate: 60
	}
}
