import { GetStaticProps } from 'next'

import { Home } from '@pages/Home'
import { QueryObject } from '@helpers/queryParamsString'
import { anilibriaSSR, objectParamsByDefault } from '@anilibriaApi/anilibriaSSR'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'

export default Home

export const getStaticProps: GetStaticProps = async () => {
	const objectParamsForSlider: QueryObject = {
		filter: ['id', 'names', 'description', 'player', 'status', 'type', 'code'],
		limit: 5
	}
	const objectParamsForSchelude: QueryObject = {
		filter: objectParamsByDefault.filter
	}
	const days = [0, 1, 2, 3, 4, 5, 6]

	const updatesTitleList = await anilibriaSSR.getUpdates(objectParamsByDefault)
	const changesTitleList = await anilibriaSSR.getChanges(objectParamsByDefault)
	const scheludeOfWeek = await anilibriaSSR.getSchedule(
		objectParamsForSchelude,
		days
	)
	let firstFiveTitles = await anilibriaSSR.getChanges(objectParamsForSlider)
	firstFiveTitles = firstSeriesToSeriesUsually(firstFiveTitles, 5)

	return {
		props: {
			updatesTitleList,
			changesTitleList,
			firstFiveTitles,
			scheludeOfWeek
		},
		revalidate: 60
	}
}
