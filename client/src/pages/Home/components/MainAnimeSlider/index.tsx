import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import styles from './MainAnimeSlider.module.scss'
import { AnimePreview } from './components/AnimePreview'
import { SeriesUsually, Title } from '@anilibriaApi/types'

interface MainAnimeSliderProps {
	titleList: Title[]
}

export const MainAnimeSlider: FC<MainAnimeSliderProps> = ({ titleList }) => {
	return (
		<Swiper
			className={styles.swiper}
			loop={true}
			modules={[Autoplay]}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false
			}}
		>
			{titleList.map((title) => (
				<SwiperSlide key={title.id}>
					<AnimePreview
						series={(title.player.playlist as SeriesUsually[])[0]}
						title={title}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
