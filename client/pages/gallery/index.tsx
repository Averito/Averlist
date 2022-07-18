import { GetStaticProps } from 'next'

import { Gallery } from '@pages/Gallery'
import { getAnimeImage } from '@waifuPicsApi/waifuPics'

export default Gallery

export const getStaticProps: GetStaticProps = async () => {
	const animeImages = await getAnimeImage('many', 'sfw', 'waifu')

	return {
		props: {
			files: animeImages
		},
		revalidate: 60
	}
}
