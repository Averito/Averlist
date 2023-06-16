import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useUrlQueryParams = (
	queryName: string,
	initialValue: string,
	onExtract?: (initialValue: string) => void
): [string, Dispatch<SetStateAction<string>>] => {
	const router = useRouter()
	const [value, setValue] = useState<string>(initialValue)

	useEffect(() => {
		void router.push(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					[queryName]: value
				}
			},
			undefined,
			{
				shallow: true
			}
		)
	}, [value])

	useEffect(() => {
		const asyncWrapper = async () => {
			const baseValue = router.query[queryName]
			if (baseValue) {
				onExtract?.(baseValue as string)
				setValue(baseValue as string)
				return
			}

			await setValue(initialValue)
			onExtract?.(initialValue)
		}
		void asyncWrapper()
	}, [router.query])

	return [value, setValue]
}
