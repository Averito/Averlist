import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Schedule, ScheludeRequest, Title } from '@anilibriaApi/types'
import { QueryObject } from '@helpers/generateQueryParamsString'

const ANILIBRIA_API_URI = process.env.NEXT_PUBLIC_ANILIBRIA_API_URI

export const anilibriaRTK = createApi({
	reducerPath: 'anilibriaApi',
	baseQuery: fetchBaseQuery({ baseUrl: ANILIBRIA_API_URI }),
	endpoints: builder => ({
		getTitle: builder.query<Title, QueryObject>({
			query: queryObject => ({
				url: '/getTitle',
				params: {
					...queryObject
				}
			})
		}),
		getUpdates: builder.query<Title[], QueryObject>({
			query: queryObject => ({
				url: '/getUpdates',
				params: {
					...queryObject
				}
			})
		}),
		getChanges: builder.query<Title[], QueryObject>({
			query: queryObject => ({
				url: '/getChanges',
				params: {
					...queryObject
				}
			})
		}),
		getSchedule: builder.query<Schedule[], ScheludeRequest>({
			query: config => ({
				url: '/getSchedule',
				params: {
					...config.params,
					days: config.days
				}
			})
		})
	})
})

export const {
	useGetTitleQuery,
	useGetUpdatesQuery,
	useGetChangesQuery,
	useGetScheduleQuery
} = anilibriaRTK
