import { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import ImageViewer from 'react-simple-image-viewer'

import styles from './Gallery.module.scss'
import { AnimeImageCard } from '@pages/Gallery/components/AnimeImageCard'
import { Tab, Tabs } from '@components/Tabs'
import {
	ChangeEventHandler,
	MouseEventHandler,
	useCallback,
	useEffect,
	useState
} from 'react'
import {
	getAnimeImage,
	WaifuPics,
	SFWCategories,
	NSFWCategories
} from '@waifuPicsApi/waifuPics'
import { useInfinityScroll } from '@hooks/useInfinityScroll'
import { ConfirmModal } from '@components/ConfirmModal'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { useAppSelector } from '@hooks/useAppSelector'
import { setIsAdult } from '@store/reducers/mainReducer'

interface GalleryProps {
	files: string[]
}

export const Gallery: NextPage<GalleryProps> = ({ files }) => {
	const dispatch = useAppDispatch()
	const isAdult = useAppSelector(state => state.main.isAdult)

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

		const newFiles = await getAnimeImage(
			'many',
			currentTab.alias as WaifuPics.Type,
			category
		)
		setAnimeImages(previous => [...previous, ...(newFiles as string[])])
	}, [currentTab.alias, setAnimeImages])

	const [confirmModalOpened, setConfirmModalOpened] = useState<boolean>(false)

	const { setIsFetch } = useInfinityScroll(getAnimeImages)

	const onSelectTab = (newSelectedTab: Tab) => {
		if (newSelectedTab.alias === 'nsfw' && !isAdult) {
			return setConfirmModalOpened(true)
		}

		setCurrentTab(newSelectedTab)
		setAnimeImages([])
		setIsFetch(true)
	}

	const onCancelConfirmModal: MouseEventHandler<HTMLButtonElement> = () => {
		setConfirmModalOpened(false)
	}
	const onOkConfirmModal: MouseEventHandler<HTMLButtonElement> = () => {
		setCurrentTab(tabs[1])
		setAnimeImages([])
		setIsFetch(true)
		setConfirmModalOpened(false)

		if (isAdult) return
		dispatch(setIsAdult(true))
	}

	const [imageViewerOpened, setImageViewerOpened] = useState<boolean>(false)
	const [currentImage, setCurrentImage] = useState<number>(0)

	const openImageViewer = (
		animeImage: string
	): MouseEventHandler<HTMLImageElement> => {
		return () => {
			const animeImageIdx = animeImages.findIndex(
				animeImageInArr => animeImageInArr === animeImage
			)
			setCurrentImage(animeImageIdx)
			setImageViewerOpened(true)
		}
	}
	const closeImageViewer = () => {
		setImageViewerOpened(false)
	}

	return (
		<>
			<Head>
				<title>Averlist | Галерея</title>
			</Head>
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
				{imageViewerOpened && (
					<ImageViewer
						src={animeImages}
						currentIndex={currentImage}
						disableScroll={false}
						closeOnClickOutside={true}
						onClose={closeImageViewer}
					/>
				)}
			</div>
		</>
	)
}
