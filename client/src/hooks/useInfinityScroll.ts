import { useCallback, useEffect, useState } from 'react'

export const useInfinityScroll = (onFetch: () => unknown) => {
	const [isFetch, setIsFetch] = useState<boolean>(false)

	const onScroll = useCallback(
		(event: any) => {
			if (isFetch) return setIsFetch(false)

			const { innerHeight } = window
			const { scrollHeight, scrollTop } = event.target.documentElement

			if (scrollHeight - (innerHeight + scrollTop) < 10) {
				return setIsFetch(true)
			}
		},
		[setIsFetch, isFetch]
	)

	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [onScroll])

	useEffect(() => {
		if (isFetch) {
			onFetch()
			setIsFetch(false)
		}
	}, [isFetch, onFetch])

	return { setIsFetch }
}
