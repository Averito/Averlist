import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Title } from '@anilibriaApi/types'

export const useGetChanges = (queryObject = queryObjectByDefault) => {
	return useQuery<Title[]>(['getChanges'], () =>
		anilibria.getChanges(queryObject)
	)
}
