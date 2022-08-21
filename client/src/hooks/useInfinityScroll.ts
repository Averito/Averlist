import { useCallback, useEffect, useState } from 'react'

export const useInfinityScroll = (onFetch: () => unknown) => {
	const [isFetch, setIsFetch] = useState<boolean>(false)

	const onScroll = useCallback((event: any) => {
		const { innerHeight } = window
		const { offsetHeight, scrollTop } = document.documentElement

		if (innerHeight + scrollTop === offsetHeight) {
			return setIsFetch(true)
		}
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [onScroll])

	useEffect(() => {
		const asyncWrapper = async () => {
			if (!isFetch) return
			await onFetch()
			setIsFetch(false)
		}
		asyncWrapper()
	}, [isFetch, onFetch])

	return { setIsFetch }
}
