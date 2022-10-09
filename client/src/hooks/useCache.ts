import { useEffect, useState } from 'react'

export const useCache = <T>(
	observable: T,
	cacheName: string,
	onExtract: (cache: T, isCacheEmpty: boolean) => unknown
) => {
	const [cache, setCache] = useState<T | null>(null)
	const [isCacheEmpty, setIsCacheEmpty] = useState<boolean>(true)

	useEffect(() => {
		const cacheString = localStorage.getItem(cacheName)
		const cacheEmpty = !cacheString

		setIsCacheEmpty(cacheEmpty)

		if (cacheEmpty) return

		const parsedCache = JSON.parse(cacheString) as T
		setCache(parsedCache)

		onExtract(parsedCache, cacheEmpty)
	}, [])

	useEffect(() => {
		localStorage.setItem(cacheName, JSON.stringify(observable))
	}, [observable])

	return { cache, isCacheEmpty }
}
