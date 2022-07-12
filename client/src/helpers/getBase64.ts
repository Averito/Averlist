export const getBase64 = (file: File): any => {
	return new Promise(resolve => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
	})
}
