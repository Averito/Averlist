import { GetServerSideProps } from 'next'
import dayjs from 'dayjs'
import {
	getAnilibriaGenres,
	getAnilibriaUpdates,
	GetAnilibriaUpdatesQueryParams,
	getAnilibriaYears
} from 'anilibria-api-wrapper'

import { AnimeCatalog } from '@pages/AnimeCatalog'
import { queryObjectByDefault } from '@anilibriaApi/anilibria'

export default AnimeCatalog

export const getServerSideProps: GetServerSideProps = async () => {
	const { data: years } = await getAnilibriaYears()
	const { data: genres } = await getAnilibriaGenres()

	const queryObject: GetAnilibriaUpdatesQueryParams = {
		filter: queryObjectByDefault.filter as string[],
		limit: 24,
		since: new Date(`01-01-${dayjs().year()}`).getDate()
	}
	const updatesTitleList = await getAnilibriaUpdates(queryObject)

	return {
		props: {
			years,
			genres,
			titleList: updatesTitleList.data
		}
	}
}
