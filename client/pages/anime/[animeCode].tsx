import { AnimePage } from '@pages/AnimePage'
import { GetServerSideProps } from 'next'

import { anilibria } from '@anilibriaApi/anilibria'

export default AnimePage

export const getServerSideProps: GetServerSideProps = async context => {
	const title = await anilibria.getTitle({
		code: context.params?.animeCode as string
	})

	return {
		props: {
			title
		}
	}
}
