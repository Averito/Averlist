import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Title, UseQueryTypesSearchTitles } from '@anilibriaApi/types'

export const useGetChanges = (
	queryObject = queryObjectByDefault,
	useQueryOptions?: UseQueryTypesSearchTitles
) => {
	return useQuery<Title[]>(
		['getChanges', queryObject],
		() => anilibria.getChanges(queryObject),
		useQueryOptions
	)
}
