export const encodeAnimeName = (name: string) => {
	return name
		?.replaceAll('(', 'bracket')
		?.replaceAll(')', 'brkt')
		?.replaceAll('?', 'question')
		?.replaceAll('%', 'precentage')
}
