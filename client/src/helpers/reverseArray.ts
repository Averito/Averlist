// Данная функция возвращает НОВЫЙ реверсивный начальному массив

export const reverseArray = (anyArray: Array<any>): Array<any> => {
	const copyArray = JSON.parse(JSON.stringify(anyArray))

	for (let i = 0; i < Math.floor(copyArray.length / 2); i++) {
		const temp = copyArray[copyArray.length - 1 - i]
		copyArray[copyArray.length - 1 - i] = copyArray[i]
		copyArray[i] = temp
	}

	return copyArray
}
