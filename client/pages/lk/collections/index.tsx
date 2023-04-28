import { GetServerSideProps } from 'next'
import { MyCollections } from '@pages/MyCollections'
import { averlist } from '@averlistApi/averlist'
import { getCookies } from 'cookies-next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const collections = await averlist.collections.my(
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

export default MyCollections
