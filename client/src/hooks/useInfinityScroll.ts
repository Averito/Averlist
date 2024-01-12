import { useCallback, useEffect, useState, useRef } from 'react'

export const useInfinityScroll = (onFetch: () => unknown) => {
	const [isFetch, setIsFetch] = useState<boolean>(false)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	const onScroll = useCallback(() => {
		const { innerHeight } = window
		const { scrollTop, scrollHeight } = document.documentElement

		if (innerHeight + scrollTop + 30 < scrollHeight || timer.current || isFetch)
			return
		setIsFetch(true)

		timer.current = setTimeout(() => {
			timer.current = null
		}, 600)
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [onScroll])

	useEffect(() => {
		if (!isFetch) return

		const asyncWrapper = async () => {
			await onFetch()
			setIsFetch(false)
		}

		void asyncWrapper()
	}, [isFetch, onFetch])

	return { setIsFetch }
}
