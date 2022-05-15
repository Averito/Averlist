import axios from 'axios'

import {
	generateQueryParamsString,
	QueryObject
} from '../../helpers/generateQueryParamsString'
import { Title } from './types'

const ANILIBRIA_API_URI = process.env.ANILIBRIA_API_URI

export const objectParamsByDefault: QueryObject = {
	filter: ['id', 'names', 'posters', 'description', 'status', 'type'],
	limit: 30
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
