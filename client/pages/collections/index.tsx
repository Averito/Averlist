import { Collections } from '@pages/Collections'
import { GetStaticProps } from 'next'
import { averlist } from '@averlistApi/averlist'

export default Collections

export const getStaticProps: GetStaticProps = async () => {
	const collections = await averlist.collections.all({
		page: 1,
		pageSize: 10,
		search: ''
	})

	return {
		props: {
			collections
		},
		revalidate: 60 * 60 * 24
	}
}
