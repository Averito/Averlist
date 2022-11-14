import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useUrlQueryParams = (
	queryName: string,
	initialValue: string,
	onExtract?: (initialValue: string) => void
): [string, (newValue: string) => Promise<void>] => {
	const router = useRouter()

	const setValue = async (newValue: string) => {
		await router.push(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					[queryName]: newValue
				}
			},
			undefined,
			{
				shallow: true
			}
		)
	}

	useEffect(() => {
		const baseValue = router.query[queryName]
		if (baseValue) {
			if (onExtract) onExtract(baseValue as string)
			return
		}

		setValue(initialValue)
		if (onExtract) onExtract(initialValue)
	}, [])

	return [(router.query[queryName] as string) || initialValue, setValue]
}
