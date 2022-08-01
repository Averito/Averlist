import { Schedule, Title } from '@anilibriaApi/types'
import { reverseArray } from '@helpers/reverseArray'
import { queryObjectByDefault } from '@anilibriaApi/anilibriaSSR'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'
import {
	useGetChangesQuery,
	useGetScheduleQuery,
	useGetUpdatesQuery
} from '@anilibriaApi/anilibriaRTK'

export const usePropsOnClient = (
	updatesTitleList: Title[],
	changesTitleList: Title[],
	firstFiveTitles: Title[],
	scheludeOfWeek: Schedule[]
) => {
	const { data: newUpdatesTitleList } = useGetUpdatesQuery(queryObjectByDefault)
	const reversedUpdatesTitleList = reverseArray(
		newUpdatesTitleList ?? updatesTitleList
	)

	const { data: changesTitleListUnstable } =
		useGetChangesQuery(queryObjectByDefault)
	const newChangesTitleList = changesTitleListUnstable
		? changesTitleListUnstable
		: changesTitleList

	const config = {
		params: {
			filter: queryObjectByDefault.filter
		},
		days: [0, 1, 2, 3, 4, 5, 6]
	}
	const { data: scheludeOfWeekUnstable } = useGetScheduleQuery(config)
	const newScheludeOfWeek = scheludeOfWeekUnstable
		? scheludeOfWeekUnstable
		: scheludeOfWeek

	const queryObject = {
		filter: [...(queryObjectByDefault.filter as string[]), 'player'],
		limit: 5
	}
	const { data: firstFiveTitlesUnstable } = useGetChangesQuery(queryObject)
	const newFirstFiveTitles = firstSeriesToSeriesUsually(
		firstFiveTitlesUnstable ?? firstFiveTitles
	)

	return {
		reversedUpdatesTitleList,
		newChangesTitleList,
		newFirstFiveTitles,
		newScheludeOfWeek
	}
}
