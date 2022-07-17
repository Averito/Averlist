export const at = (array: any[], idx: number) => {
	if (idx >= 0) return array[idx]

	const idxAbs = Math.abs(idx)
	return array[array.length - 1 - (idxAbs - 1)]
}
