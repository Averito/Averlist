interface AnyArray {
	id: number
	[key: string]: any
}

export const uniqueIds = (array: AnyArray[]) => {
	const resultArray: AnyArray[] = []

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
