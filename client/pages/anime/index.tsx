import { GetStaticProps } from 'next'

import { Anime } from '@pages/Anime'
import { anilibriaSSR, queryObjectByDefault } from '@anilibriaApi/anilibriaSSR'
import dayjs from 'dayjs'

export default Anime

export const getStaticProps: GetStaticProps = async () => {
	const years = await anilibriaSSR.getYears()
	const genres = await anilibriaSSR.getGenres()

	const queryObject = {
		filter: queryObjectByDefault.filter,
		limit: 44,
		since: new Date(`0-0-${dayjs().year()}`).getDate()
	}
	const updatesTitleList = await anilibriaSSR.getUpdates(queryObject)

	return {
		props: {
			years,
			genres,
			titleList: updatesTitleList
		},
		revalidate: 60
	}
}
