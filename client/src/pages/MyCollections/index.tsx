import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { NextPage } from 'next'

import styles from './Collections.module.scss'
import { Button, CollectionCard, Flex, Input } from '@components'
import { Averlist } from '@averlistApi/types'
import collectionsStore from '@stores/collections.store'
import { useInput } from '@hooks/useInput'

interface MyCollectionsProps {
	collections: Averlist.Collection[]
}

export const MyCollections: NextPage<MyCollectionsProps> = observer(
	({ collections }) => {
		const router = useRouter()

		useEffect(() => {
			collectionsStore.setCollections(collections)
		}, [])

		const collectionsForIterate = collectionsStore.collections.length
			? collectionsStore.collections
			: collections

		const onClickCreateCollection = () => {
			void router.push('/lk/collections/create')
		}

		const [searchValue, setSearchValue] = useInput()

		const filteredCollections = useMemo<Averlist.Collection[]>(
			() =>
				(collectionsForIterate || []).filter(collection =>
					collection.name.toLowerCase().includes(searchValue.toLowerCase())
				),
			[searchValue, collectionsForIterate]
		)

		return (
			<section className={styles.wrapper}>
				<div className={styles.container}>
					<Flex
						margin='0 0 15px 0'
						justifyContent='space-between'
						alignItems='flex-end'
					>
						<Input
							width='min(100%, 290px)'
							label='Поиск'
							margin='0 10px 0 0'
							value={searchValue}
							onChange={setSearchValue}
							placeholder='Поиск'
						/>
						<Button width='auto' onClick={onClickCreateCollection}>
							Создать
						</Button>
					</Flex>
					<div className={styles.collections}>
						{filteredCollections.map(collection => (
							<CollectionCard
								key={collection.id}
								collection={collection}
								myPage
							/>
						))}
					</div>
				</div>
			</section>
		)
	}
)
