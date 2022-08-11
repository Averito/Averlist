import { GetStaticProps } from 'next'

import { Anime } from '@pages/Anime'
import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import dayjs from 'dayjs'

export default Anime

export const getStaticProps: GetStaticProps = async () => {
	const years = await anilibria.getYears()
	const genres = await anilibria.getGenres()

	const queryObject = {
		filter: queryObjectByDefault.filter,
		limit: 44,
		since: new Date(`0-0-${dayjs().year()}`).getDate()
	}
	const updatesTitleList = await anilibria.getUpdates(queryObject)

	return {
		props: {
			years,
			genres,
			titleList: updatesTitleList
		},
		revalidate: 60
	}
}
