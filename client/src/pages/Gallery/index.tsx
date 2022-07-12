import { NextPage } from 'next'
import Image from 'next/image'

import styles from './Gallery.module.scss'
import { AnimeImageCard } from '@pages/Gallery/components/AnimeImageCard'
import { Tab, Tabs } from '@components/Tabs'
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import {
	getAnimeImage,
	WaifuPics,
	SFWCategories,
	NSFWCategories
} from '@waifuPicsApi/waifuPics'
import { ScrollbarEvents } from 'swiper/types'
import { useInfinityScroll } from '@pages/Gallery/hooks/useInfinityScroll'

interface GalleryProps {
	files: string[]
}

export const Gallery: NextPage<GalleryProps> = ({ files }) => {
	const [animeImages, setAnimeImages] = useState<string[]>(files)

	const tabs = [
		{
			name: 'SFW',
			alias: 'sfw'
		},
		{
			name: 'NSFW',
			alias: 'nsfw'
		}
	]

	const [currentTab, setCurrentTab] = useState<Tab>(tabs[0])
	const [isFetch, setIsFetch] = useState<boolean>(false)

	useInfinityScroll(setAnimeImages, currentTab, isFetch, setIsFetch)

	const onSelectTab = (newSelectedTab: Tab) => {
		setCurrentTab(newSelectedTab)
		setAnimeImages([])
		setIsFetch(true)
	}

	return (
		<div className={styles.container}>
			<div className={styles.tabsSegment}>
				<Tabs tabs={tabs} currentTab={currentTab} selectTab={onSelectTab} />
			</div>
			<div className={styles.animeImagesContainer}>
				{animeImages.map((image, idx) => (
					<AnimeImageCard animeImage={image} key={idx} />
				))}
			</div>
		</div>
	)
}
