interface AnyArray {
	id: number | string
	[key: string]: any
}

export const uniqueIds = <T extends AnyArray>(array: T[]): T[] => {
	const resultArray: T[] = []
	const values = new Map<AnyArray['id'], null>()

	for (const key in array) {
		if (values.has(array[key].id)) continue

		values.set(array[key].id, null)
		resultArray.push(array[key])
	}

	return resultArray
}
