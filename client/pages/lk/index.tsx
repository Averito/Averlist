import { GetServerSideProps } from 'next'
import { getCookie, getCookies } from 'cookies-next'

import { LK } from '@pages/LK'
import { averlist } from '@averlistApi/averlist'

export default LK

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		const me = await averlist.users.me(getCookies({ req }).accessToken)

		return {
			props: {
				me,
				reload: false
			}
		}
	} catch (err) {
		return {
			props: {
				reload: true
			}
		}
	}
}
