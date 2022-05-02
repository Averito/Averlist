import { useEffect, useState } from 'react'

export const useWindowSize = () => {
	const [width, setWidth] = useState<number>(window.innerWidth)
	const [height, setHeight] = useState<number>(window.innerHeight)

	useEffect(() => {
		const setProps = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}
		window.addEventListener('resize', setProps)
		return () => window.removeEventListener('resize', setProps)
	}, [])

	return { width, height, isMobile: width <= 768 }
}
