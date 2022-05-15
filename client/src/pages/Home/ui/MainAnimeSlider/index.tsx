import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import { AnimePreview } from '@widgets/AnimePreview'
import { SeriesUsually, Title } from '@anilibriaApi/types'

interface MainAnimeSliderProps {
	titleList: Title[]
}

export const MainAnimeSlider: FC<MainAnimeSliderProps> = ({
	titleList
}) => {
	return (
		<Swiper
			loop={true}
			modules={[Autoplay]}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false
			}}
		>
			{titleList.map((title, idx) => (
				<SwiperSlide key={title.id}>
					<AnimePreview series={(title.player.playlist as SeriesUsually[])[0]} title={title} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}
