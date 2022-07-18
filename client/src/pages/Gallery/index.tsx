import { NextPage } from 'next'
import { useRouter } from 'next/router'

import styles from './Gallery.module.scss'
import { AnimeImageCard } from '@pages/Gallery/components/AnimeImageCard'
import { Tab, Tabs } from '@components/Tabs'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import {
	getAnimeImage,
	NSFWCategories,
	SFWCategories,
	WaifuPics
} from '@waifuPicsApi/waifuPics'
import { useInfinityScroll } from '@hooks/useInfinityScroll'
import { ConfirmModal } from '@components/ConfirmModal'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { useAppSelector } from '@hooks/useAppSelector'
import { setIsAdult } from '@store/reducers/mainReducer'
import { tabs } from '@pages/Gallery/tabs'
import {
	appendAnimeImages,
	setAnimeImages,
	setCurrentTab,
	setScrollHeight
} from '@store/reducers/galleryReducer'
import { at } from '@helpers/at'
import { Meta } from '@utils/Meta'

interface GalleryProps {
	files: string[]
}

export const Gallery: NextPage<GalleryProps> = ({ files }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const isAdult = useAppSelector(state => state.main.isAdult)
	const { animeImages, savedScrollHeight, currentTab } = useAppSelector(
		state => state.gallery
	)

	useEffect(() => {
		window.scrollTo({ top: savedScrollHeight })

		const oldAnimeImages =
			animeImages.length >= files.length ? animeImages : files
		dispatch(setAnimeImages(oldAnimeImages))
	}, [dispatch, files, savedScrollHeight])

	const getAnimeImages = useCallback(async () => {
		let randomCategoryIdx = 0
		let category = SFWCategories[0]

		if (currentTab.alias === 'sfw') {
			randomCategoryIdx = Math.ceil(Math.random() * SFWCategories.length - 1)
			category = SFWCategories[randomCategoryIdx]
		} else {
			randomCategoryIdx = Math.ceil(Math.random() * NSFWCategories.length - 1)
			category = NSFWCategories[randomCategoryIdx]
		}

		const newAnimeImages = await getAnimeImage(
			'many',
			currentTab.alias as WaifuPics.Type,
			category
		)
		dispatch(appendAnimeImages(newAnimeImages as string[]))
	}, [currentTab.alias, dispatch])

	const [confirmModalOpened, setConfirmModalOpened] = useState<boolean>(false)

	const { setIsFetch } = useInfinityScroll(getAnimeImages)

	const onSelectTab = (newSelectedTab: Tab) => {
		if (newSelectedTab.alias === 'nsfw' && !isAdult) {
			return setConfirmModalOpened(true)
		}

		if (newSelectedTab.alias !== currentTab.alias) {
			dispatch(setAnimeImages([]))
		}

		dispatch(setCurrentTab(newSelectedTab))
		setIsFetch(true)
	}

	const onCancelConfirmModal: MouseEventHandler<HTMLButtonElement> = () => {
		setConfirmModalOpened(false)
	}
	const onOkConfirmModal: MouseEventHandler<HTMLButtonElement> = () => {
		dispatch(setAnimeImages([]))
		dispatch(setCurrentTab(tabs[1]))
		setIsFetch(true)
		setConfirmModalOpened(false)

		if (isAdult) return
		dispatch(setIsAdult(true))
	}

	const openImageViewer = (
		animeImage: string
	): MouseEventHandler<HTMLImageElement> => {
		return () => {
			const animeImageIdx = animeImages.findIndex(
				animeImageInArr => animeImageInArr === animeImage
			)
			const animeImageName = at(animeImages[animeImageIdx].split('/'), -1)

			dispatch(setScrollHeight(window.scrollY))
			router.push(`/gallery/${animeImageName}`)
		}
	}

	return (
		<>
			<Meta
				title='Averlist | Галерея'
				description='Коллекция NSFW (и не очень) артов)'
			/>
			<div className={styles.container}>
				<div className={styles.tabsSegment}>
					<Tabs tabs={tabs} currentTab={currentTab} selectTab={onSelectTab} />
				</div>
				<div className={styles.animeImagesContainer}>
					{animeImages.map((image, idx) => (
						<AnimeImageCard
							onClick={openImageViewer}
							animeImage={image}
							key={idx}
						/>
					))}
				</div>
				<ConfirmModal
					title='Подтвердите действие'
					bodyText='Вам есть 18?'
					cancelButtonText='Нет'
					okButtonText='Да'
					onCancel={onCancelConfirmModal}
					onOK={onOkConfirmModal}
					opened={confirmModalOpened}
				/>
			</div>
		</>
	)
}
