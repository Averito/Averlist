import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { queryObjectByDefault } from '@anilibriaApi/anilibria'
import {
	anilibriaSearchTitles,
	AnilibriaSearchTitlesQueryParams,
	Title
} from 'anilibria-api-wrapper'

export type UseQueryTypesSearchTitles = Omit<
	UseQueryOptions<Title[], unknown, Title[], QueryKey>,
	'initialData' | 'queryKey'
>

export const useGetSearchTitles = (
	queryObject: AnilibriaSearchTitlesQueryParams = queryObjectByDefault,
	useQueryOptions?: UseQueryTypesSearchTitles
) => {
	return useQuery<Title[]>(
		['searchTitles', queryObject],
		() => anilibriaSearchTitles(queryObject).then(response => response.data),
		useQueryOptions
	)
}
