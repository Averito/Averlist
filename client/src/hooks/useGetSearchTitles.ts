import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Title } from '@anilibriaApi/types'

export const useGetSearchTitles = (queryObject = queryObjectByDefault) => {
	return useQuery<Title[]>(['getSchedule', queryObject], () =>
		anilibria.searchTitles(queryObject)
	)
}
