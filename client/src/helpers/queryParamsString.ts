type QueryObjectValue = string[] | string | number | number[]

export type QueryObject = Record<string, QueryObjectValue>
type StringQueryParamsObject = Record<string, string[]>

export const queryParamsString = (queryParamsObject: QueryObject) => {
	const stringQueryParamsObject: StringQueryParamsObject = {}
	const queryString = new URLSearchParams()
	for (const key in queryParamsObject) {
		stringQueryParamsObject[key] = String(queryParamsObject[key]).split(',')
		queryString.set(key, stringQueryParamsObject[key].join(','))
	}
	return `${
		queryString.toString().length > 0 ? '?' : ''
	}${queryString.toString()}`
}
