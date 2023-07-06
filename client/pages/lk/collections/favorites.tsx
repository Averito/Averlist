import { MyFavoriteCollections } from '@pages/MyFavoriteCollections'
import { GetServerSideProps } from 'next'
import { averlist } from '@averlistApi/averlist'
import { getCookies } from 'cookies-next'

export default MyFavoriteCollections

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const collections = await averlist.collections.myFavorites(
			getCookies({ req }).accessToken
		)

		return {
			props: {
				collections
			}
		}
	} catch {
		return {
			props: {
				collections: []
			},
			redirect: '/lk'
		}
	}
}
