interface AnyArray {
	id: number | string
	[key: string]: any
}

export const uniqueIds = <T extends AnyArray>(array: T[]): T[] => {
	const resultArray: T[] = []

	for (const key in array) {
		let includes = false

		for (const nestedKey in resultArray) {
			if (array[key].id === resultArray[nestedKey].id) {
				includes = true
			}
		}

		if (!includes) resultArray.push(array[key])
	}

	return resultArray
}
