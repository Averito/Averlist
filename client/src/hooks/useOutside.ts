import { RefObject, useEffect } from 'react'

export const useOutside = (
	target: RefObject<HTMLElement>,
	onOutside: (event: MouseEvent) => unknown
) => {
	useEffect(() => {
		const onClickHandler = (event: MouseEvent) => {
			if (!target.current) return
			if (target.current.contains(event.target as Node)) return

			onOutside(event)
		}
		window.addEventListener('click', onClickHandler)
		return () => window.removeEventListener('click', onClickHandler)
	}, [onOutside, target])
}
