import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import { FC } from 'react'

import styles from './AnimeSlider.module.scss'
import { Title } from '@anilibriaApi/types'
import { AnimeCard } from '@widgets/AnimeCard'

interface AnimeSliderProps {
	titleList: Title[]
	title: string
	href: string
}

export const AnimeSlider: FC<AnimeSliderProps> = ({ titleList, title, href }) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				<Link href={href}>
					{title}
				</Link>
			</h3>
			<Swiper slidesPerView={8} spaceBetween={10}>
				{titleList.map(title => (
					<SwiperSlide key={title.id}>
						<AnimeCard title={title} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
