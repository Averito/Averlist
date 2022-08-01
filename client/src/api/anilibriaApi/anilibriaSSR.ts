import axios from 'axios'

import { queryParamsString, QueryObject } from '@helpers/queryParamsString'
import { Schedule, Title } from './types'

const ANILIBRIA_API_URI = process.env.NEXT_PUBLIC_ANILIBRIA_API_URI

export const queryObjectByDefault: QueryObject = {
	filter: ['id', 'names', 'description', 'posters', 'status', 'type', 'code'],
	limit: 30
}

export const anilibriaSSR = {
	async getTitle(queryParams: QueryObject = {}) {
		const url = ANILIBRIA_API_URI + '/getTitle' + queryParamsString(queryParams)
		const response = await axios.get<Title>(url)
		return response.data
	},
	async getTitles(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getTitles' + queryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getRandomTitle(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getRandomTitle' + queryParamsString(queryParams)
		const response = await axios.get<Title>(url)
		return response.data
	},
	async getUpdates(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getUpdates' + queryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getChanges(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getChanges' + queryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getGenres(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getGenres' + queryParamsString(queryParams)
		const response = await axios.get<string[]>(url)
		return response.data
	},
	async getYears(queryParams: QueryObject = {}) {
		const url = ANILIBRIA_API_URI + '/getYears' + queryParamsString(queryParams)
		const response = await axios.get<number[]>(url)
		return response.data
	},
	async searchTitles(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/searchTitles' + queryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getSchedule(queryParams: QueryObject = {}, days: number[]) {
		queryParams.days = days

		const url =
			ANILIBRIA_API_URI + '/getSchedule' + queryParamsString(queryParams)
		const response = await axios.get<Schedule[]>(url)
		return response.data
	}
}
