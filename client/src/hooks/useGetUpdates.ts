import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Title } from '@anilibriaApi/types'

export const useGetUpdates = (queryObject = queryObjectByDefault) => {
	return useQuery<Title[]>(['getUpdates'], () =>
		anilibria.getUpdates(queryObject)
	)
}
