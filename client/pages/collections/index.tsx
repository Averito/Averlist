import { Collections } from '@pages/Collections'
import { GetServerSideProps } from 'next'
import { averlist } from '@averlistApi/averlist'

export default Collections

export const getServerSideProps: GetServerSideProps = async () => {
	const collections = await averlist.collections.all({
		page: 1,
		pageSize: 10,
		search: ''
	})

	return {
		props: {
			collections
		}
	}
}
