import { Gallery } from '@pages/Gallery'
import { getAnimeImage } from '@waifuPicsApi/waifuPics'

export default Gallery

export const getServerSideProps = async () => {
	const files = await getAnimeImage('many', 'sfw', 'waifu')

	return {
		props: {
			files: files
		}
	}
}
