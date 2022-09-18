import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Title, UseQueryTypesSearchTitles } from '@anilibriaApi/types'

export const useGetUpdates = (
	queryObject = queryObjectByDefault,
	useQueryOptions?: UseQueryTypesSearchTitles
) => {
	return useQuery<Title[]>(
		['getUpdates', queryObject],
		() => anilibria.getUpdates(queryObject),
		useQueryOptions
	)
}
