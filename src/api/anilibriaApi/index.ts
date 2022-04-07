import axios from 'axios'

import { ANILIBRIA_API_URI } from 'variebles'
import {
	generateQueryParamsString,
	QueryObject
} from '../generateQueryParamsString'
import { Title } from './types'

export const objectParamsByDefault: QueryObject = {
	filter: ['id', 'names', 'posters', 'description'],
	limit: -1
}

export const anilibria = {
	async getTitle(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getTitle' + generateQueryParamsString(queryParams)
		const response = await axios.get<Title>(url)
		return response.data
	},
	async getTitles(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getTitles' + generateQueryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getRandomTitle(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI +
			'/getRandomTitle' +
			generateQueryParamsString(queryParams)
		const response = await axios.get<Title>(url)
		return response.data
	},
	async getUpdates(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getUpdates' + generateQueryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getChanges(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getChanges' + generateQueryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	},
	async getGenres(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getGenres' + generateQueryParamsString(queryParams)
		const response = await axios.get<string[]>(url)
		return response.data
	},
	async getYears(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI + '/getYears' + generateQueryParamsString(queryParams)
		const response = await axios.get<number[]>(url)
		return response.data
	},
	async searchTitles(queryParams: QueryObject = {}) {
		const url =
			ANILIBRIA_API_URI +
			'/searchTitles' +
			generateQueryParamsString(queryParams)
		const response = await axios.get<Title[]>(url)
		return response.data
	}
}
