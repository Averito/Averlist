export const uniqueCheck = (strArray: string[]) => {
	const modArray = strArray.map(str => String(str))
	const editedArray: string[] = []

	for (let idx = 0; idx < modArray.length; idx++) {
		let dublicateCount = 0

		modArray.forEach(str2 => {
			if (str2 === modArray[idx]) {
				dublicateCount++
			}
		})

		if (dublicateCount >= 2 && editedArray.some(str => str === modArray[idx])) {
			continue
		}
		editedArray.push(modArray[idx])
	}

	return editedArray
}
