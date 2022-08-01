import { useRouter } from 'next/router'
import {
	KeyboardEventHandler,
	MouseEventHandler,
	useCallback,
	useEffect,
	useState
} from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import classnames from 'classnames'

import styles from './GalleryImageViewer.module.scss'
import arrowLeftLine from '@assets/icons/arrow-left-s-line.png'
import arrowRightLine from '@assets/icons/arrow-right-s-line.png'
import { useAppSelector } from '@hooks/useAppSelector'
import animeImage from '../../../pages/gallery/[animeImage]'

const WAIFU_PICS_URI = process.env.NEXT_PUBLIC_WAIFU_PICS_URI

export const GalleryImageViewer: NextPage = () => {
	const router = useRouter()

	const { animeImages } = useAppSelector(state => state.gallery)

	const currentAnimeImage = router.query.animeImage
	const currentAnimeImageUri = `${WAIFU_PICS_URI}/${currentAnimeImage}`

	const [currentAnimeImageIdx, setCurrentAnimeImageIdx] = useState<number>(
		animeImages.findIndex(animeImage => animeImage === currentAnimeImageUri)
	)

	const animeImageUri = animeImages.length
		? animeImages[currentAnimeImageIdx] ?? currentAnimeImageUri
		: currentAnimeImageUri

	const preloadImage = (nextImg: string) => {
		const img = document.createElement('img')
		img.src = nextImg
	}

	const onClickImageViewer: MouseEventHandler<HTMLDivElement> = event => {
		const tag = event.target as HTMLElement

		if (tag.tagName === 'IMG' || tag.dataset.type === 'arrow') return

		router.push('/gallery')
	}

	const onClickOnArrow = useCallback(
		(direction: 'right' | 'left'): MouseEventHandler<HTMLDivElement> => {
			if (!animeImages[currentAnimeImageIdx]) return () => {}
			let nextId = 0

			if (direction === 'right') {
				nextId =
					currentAnimeImageIdx === animeImages.length - 1
						? 0
						: currentAnimeImageIdx + 1
			} else {
				nextId = currentAnimeImageIdx
					? currentAnimeImageIdx - 1
					: animeImages.length - 1
			}

			return () => {
				setCurrentAnimeImageIdx(nextId)
				preloadImage(animeImages[nextId])
			}
		},
		[animeImages, currentAnimeImageIdx]
	)
	const onKeyDown = useCallback(
		(event: any) => {
			if (event.code === 'ArrowRight') onClickOnArrow('right')(event)
			if (event.code === 'ArrowLeft') onClickOnArrow('left')(event)
		},
		[onClickOnArrow]
	)

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [onKeyDown])

	const arrowDisabled = animeImages[currentAnimeImageIdx]
		? ''
		: styles.arrowDisabled

	return (
		<div className={styles.imageViewerContainer} onClick={onClickImageViewer}>
			<div
				className={classnames(styles.arrow, arrowDisabled)}
				onClick={onClickOnArrow('left')}
				data-type='arrow'
			>
				<Image src={arrowLeftLine} width={20} height={30} alt='Стрелочка' />
			</div>
			<div className={styles.image}>
				<Image
					src={animeImageUri}
					alt='Картинка'
					width={400}
					height={550}
					layout='responsive'
					priority
				/>
			</div>
			<div
				className={classnames(styles.arrow, arrowDisabled)}
				onClick={onClickOnArrow('right')}
				data-type='arrow'
			>
				<Image src={arrowRightLine} width={20} height={30} alt='Стрелочка' />
			</div>
		</div>
	)
}
