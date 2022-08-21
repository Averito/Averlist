import { useQuery } from '@tanstack/react-query'

import { anilibria, queryObjectByDefault } from '@anilibriaApi/anilibria'
import { Schedule } from '@anilibriaApi/types'

export const useGetSchedule = (
	days: number[],
	queryObject = queryObjectByDefault
) => {
	return useQuery<Schedule[]>(['getSchedule', queryObject], () =>
		anilibria.getSchedule(queryObject, days)
	)
}
