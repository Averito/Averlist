import axios from 'axios'

import { QueryObject, queryParamsString } from '@helpers/queryParamsString'
import { Schedule, Title } from './types'

const ANILIBRIA_API_URI = process.env.NEXT_PUBLIC_ANILIBRIA_API_URI

export const queryObjectByDefault: QueryObject = {
	filter: ['id', 'names', 'description', 'posters', 'status', 'type', 'code'],
	limit: 30
}

const getData = async <T>(
	method: string,
	queryParams: QueryObject
): Promise<T> => {
	const url = ANILIBRIA_API_URI + method + queryParamsString(queryParams)
	const response = await axios.get<T>(url)
	return response.data
}

export const anilibria = {
	async getTitle(queryParams: QueryObject = {}) {
		return getData<Title>('/getTitle', queryParams)
	},
	async getTitles(queryParams: QueryObject = {}) {
		return getData<Title[]>('/getTitles', queryParams)
	},
	async getRandomTitle(queryParams: QueryObject = {}) {
		return getData<Title[]>('/getRandomTitle', queryParams)
	},
	async getUpdates(queryParams: QueryObject = {}) {
		return getData<Title[]>('/getUpdates', queryParams)
	},
	async getChanges(queryParams: QueryObject = {}) {
		return getData<Title[]>('/getChanges', queryParams)
	},
	async getGenres(queryParams: QueryObject = {}) {
		return getData<string[]>('/getGenres', queryParams)
	},
	async getYears(queryParams: QueryObject = {}) {
		return getData<number[]>('/getYears', queryParams)
	},
	async searchTitles(queryParams: QueryObject = {}) {
		return getData<Title[]>('/searchTitles', queryParams)
	},
	async getSchedule(queryParams: QueryObject = {}, days: number[]) {
		queryParams.days = days

		const url =
			ANILIBRIA_API_URI + '/getSchedule' + queryParamsString(queryParams)
		const response = await axios.get<Schedule[]>(url)
		return response.data
	}
}
