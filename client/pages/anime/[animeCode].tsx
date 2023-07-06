import { GetServerSidePropsContext } from 'next'

import { AnimePage } from '@pages/AnimePage'
import { detectDevice } from '@helpers/detectDevice'
import { getAnilibriaTitle } from 'anilibria-api-wrapper'

export default AnimePage

export const getServerSideProps = async ({
	res,
	...context
}: GetServerSidePropsContext) => {
	try {
		const devicesObj = detectDevice(context.req.headers['user-agent'] || '')
		const title = await getAnilibriaTitle({
			code: context.params?.animeCode as string,
			playlist_type: 'array'
		})

		return {
			props: {
				title: title.data,
				devices: devicesObj
			}
		}
	} catch {
		res.writeHead(301, { Location: '/' })
	}
}
