import {
	useCallback,
	useEffect,
	useState,
	Dispatch,
	SetStateAction
} from 'react'

import { Tab } from '@components/Tabs'
import {
	getAnimeImage,
	NSFWCategories,
	SFWCategories,
	WaifuPics
} from '@waifuPicsApi/waifuPics'

export const useInfinityScroll = (
	setAnimeImages: Dispatch<SetStateAction<string[]>>,
	currentTab: Tab
) => {
	const [isFetch, setIsFetch] = useState<boolean>(false)
	const [counter, setCounter] = useState<number>(1)

	const onScroll = useCallback(
		(event: any) => {
			const { innerHeight } = window
			const { scrollHeight, scrollTop } = event.target.documentElement

			if (scrollHeight - (innerHeight + scrollTop) < 200) {
				return setIsFetch(true)
			}
			setIsFetch(false)
		},
		[setIsFetch]
	)

	const onScrollFetch = useCallback(async () => {
		let randomCategoryIdx = 0
		let category = SFWCategories[0]

		if (currentTab.alias === 'sfw') {
			randomCategoryIdx = Math.ceil(Math.random() * SFWCategories.length - 1)
			category = SFWCategories[randomCategoryIdx]
		} else {
			randomCategoryIdx = Math.ceil(Math.random() * NSFWCategories.length - 1)
			category = NSFWCategories[randomCategoryIdx]
		}

		const newFiles = await getAnimeImage(
			'many',
			currentTab.alias as WaifuPics.Type,
			category
		)
		setAnimeImages(previous => [...previous, ...(newFiles as string[])])
	}, [currentTab.alias, setAnimeImages])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [onScroll])

	useEffect(() => {
		if (isFetch) onScrollFetch()
	}, [isFetch, onScrollFetch])

	return { setIsFetch }
}
