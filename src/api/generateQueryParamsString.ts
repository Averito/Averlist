export type QueryObject = {
	[key: string]: string[] | string | number | number[]
}
type StringQueryParamsObject = {
	[key: string]: string[]
}

export const generateQueryParamsString = (queryParamsObject: QueryObject) => {
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
