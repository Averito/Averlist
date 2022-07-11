import { GetServerSideProps } from 'next'

import { Home } from '@pages/Home'
import { QueryObject } from '../src/helpers/generateQueryParamsString'
import { anilibria } from '@anilibriaApi/anilibria'
import { SeriesUsually } from '@anilibriaApi/types'
import { seriesToSeriesUsually } from '../src/helpers/seriesToSeriesUsually'
import { firstSeriesToSeriesUsually } from '../src/helpers/firstSeriesToSeriesUsually'

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
	const objectParams: QueryObject = {
		filter: ['id', 'names', 'description', 'posters', 'status', 'type', 'code'],
		limit: 30
	}
	const objectParamsForSlider: QueryObject = {
		filter: ['id', 'names', 'description', 'player', 'status', 'type'],
		limit: 5
	}

	const updatesTitleList = await anilibria.getUpdates(objectParams)
	const changesTitleList = await anilibria.getChanges(objectParams)
	let firstFiveTitles = await anilibria.getChanges(objectParamsForSlider)
	firstFiveTitles = firstSeriesToSeriesUsually(firstFiveTitles, 5)

	return {
		props: {
			updatesTitleList,
			changesTitleList,
			firstFiveTitles
		}
	}
}
