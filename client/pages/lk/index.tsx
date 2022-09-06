import { GetServerSideProps } from 'next'
import { getCookies } from 'cookies-next'

import { LK } from '@pages/LK'
import { averlist } from '@averlistApi/averlist'

export default LK

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const me = await averlist.users.me(getCookies({ req }).accessToken)

		return {
			props: {
				me
			}
		}
	} catch {
		return {
			props: {}
		}
	}
}
