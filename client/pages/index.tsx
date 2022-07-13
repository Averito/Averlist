import { GetStaticProps } from 'next'

import { Home } from '@pages/Home'
import { QueryObject } from '@helpers/generateQueryParamsString'
import { anilibria } from '@anilibriaApi/anilibria'
import { SeriesUsually } from '@anilibriaApi/types'
import { seriesToSeriesUsually } from '@helpers/seriesToSeriesUsually'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'

export default Home

export const getStaticProps: GetStaticProps = async () => {
	const objectParams: QueryObject = {
		filter: ['id', 'names', 'description', 'posters', 'status', 'type', 'code'],
		limit: 30
	}
	const objectParamsForSlider: QueryObject = {
		filter: ['id', 'names', 'description', 'player', 'status', 'type', 'code'],
		limit: 5
	}
	const objectParamsForSchelude: QueryObject = {
		filter: ['id', 'names', 'description', 'posters', 'status', 'type', 'code']
	}
	const days = [0, 1, 2, 3, 4, 5, 6]

	const updatesTitleList = await anilibria.getUpdates(objectParams)
	const changesTitleList = await anilibria.getChanges(objectParams)
	const scheludeOfWeek = await anilibria.getSchelude(
		objectParamsForSchelude,
		days
	)
	let firstFiveTitles = await anilibria.getChanges(objectParamsForSlider)
	firstFiveTitles = firstSeriesToSeriesUsually(firstFiveTitles, 5)

	return {
		props: {
			updatesTitleList,
			changesTitleList,
			firstFiveTitles,
			scheludeOfWeek
		}
	}
}
