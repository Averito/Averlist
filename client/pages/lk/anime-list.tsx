import { AnimeList } from '@pages/AnimeList'
import { GetServerSideProps } from 'next'
import { averlist } from '@averlistApi/averlist'
import { getCookies } from 'cookies-next'

export default AnimeList

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const animeList = await averlist.anime.list(getCookies({ req }).accessToken)

		return {
			props: { animeList }
		}
	} catch (err) {
		return {
			props: {
				animeList: []
			},
			redirect: '/'
		}
	}
}
