import { GetServerSideProps } from 'next'

import { AnimePage } from '@pages/AnimePage'
import { anilibria } from '@anilibriaApi/anilibria'
import { detectDevice } from '@helpers/detectDevice'

export default AnimePage

export const getServerSideProps: GetServerSideProps = async context => {
	const devicesObj = detectDevice(context.req.headers['user-agent'] || '')
	const title = await anilibria.getTitle({
		code: context.params?.animeCode as string
	})

	return {
		props: {
			title,
			devices: devicesObj
		}
	}
}
