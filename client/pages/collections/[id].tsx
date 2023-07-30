import { getCookies } from 'cookies-next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { CollectionPage } from '@pages/CollectionPage'
import { averlist } from '@averlistApi/averlist'

export default CollectionPage

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	try {
		const collectionId = context.params?.id
		if (!collectionId || Array.isArray(collectionId))
			throw new Error('Collection id is undefined')

		const collection = await averlist.collections.getById(
			collectionId,
			getCookies({ req: context.req }).accessToken
		)

		if (!collection) throw new Error('Collection not found')

		return {
			props: {
				collection
			}
		}
	} catch {
		context.res.writeHead(301, { Location: '/' })
	}
}
