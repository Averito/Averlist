import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useUrlParams = (
	queryName: string,
	initialValue: string | number
): [string | number, (newValue: string | number) => unknown] => {
	const router = useRouter()
	const [value, setValue] = useState<string | number>(initialValue)

	const setValueModify = async (newValue: string | number) => {
		setValue(newValue)
		await router.push(
			router.pathname,
			{
				query: {
					...router.query,
					[queryName]: String(value)
				}
			},
			{
				shallow: true
			}
		)
	}

	useEffect(() => {
		const baseValue = router.query[queryName]
		if (baseValue) return setValue(baseValue as string | number)

		setValueModify(initialValue)
	}, [])

	return [value, setValueModify]
}
