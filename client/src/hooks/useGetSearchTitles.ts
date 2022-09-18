import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Title, UseQueryTypesSearchTitles } from '@anilibriaApi/types'

export const useGetSearchTitles = (
	queryObject = queryObjectByDefault,
	useQueryOptions?: UseQueryTypesSearchTitles
) => {
	return useQuery<Title[]>(
		['searchTitles', queryObject],
		() => anilibria.searchTitles(queryObject),
		useQueryOptions
	)
}
