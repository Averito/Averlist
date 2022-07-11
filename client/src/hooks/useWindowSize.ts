import { useEffect, useState } from 'react'

export const useWindowSize = () => {
	let initialWidth = 0
	let initialHeight = 0
	if (typeof window !== 'undefined') {
		initialWidth = window.innerWidth
		initialHeight = window.innerHeight
	}

	const [width, setWidth] = useState<number>(initialWidth)
	const [height, setHeight] = useState<number>(initialHeight)

	useEffect(() => {
		const editWH = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}
		window.addEventListener('resize', editWH)
		return () => window.removeEventListener('resize', editWH)
	}, [])

	const isMobile = width <= 768

	return { width, height, isMobile }
}
