import { observer, useObserver } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NextPage } from 'next'

import styles from './Collections.module.scss'
import { Autocomplete, CollectionCard } from '@components'
import { useProtectedRoute } from '@hooks/useProtectedRoute'
import userStore from '@stores/user.store'
import { CollectionsProps } from './Collections.types'
import { AutocompleteMenu } from '@components/Autocomplete'
import collectionCatalogStore from '@stores/collectionCatalog.store'
import { PAGE_SIZE } from '@pages/Collections/Collections.config'
import { useInfinityScroll } from '@hooks/useInfinityScroll'

export const Collections: NextPage<CollectionsProps> = observer(
	({ collections }) => {
		useProtectedRoute('/login', userStore.isAuth)

		const [currentPage, setCurrentPage] = useState<number>(2)
		const searchValue = useObserver(() => collectionCatalogStore.searchValue)

		const timeout = useRef<ReturnType<typeof setTimeout>>()
		const onChangeSearchValue = (value: string) => {
			clearTimeout(timeout.current)
			collectionCatalogStore.searchValue = value

			timeout.current = setTimeout(async () => {
				await collectionCatalogStore.searchCollection(
					1,
					PAGE_SIZE,
					value,
					false
				)
				setCurrentPage(2)
			}, 300)
		}

		const onScroll = useCallback(async () => {
			await collectionCatalogStore.searchCollection(
				currentPage,
				PAGE_SIZE,
				searchValue,
				true
			)
			setCurrentPage(prevState => prevState + 1)
		}, [currentPage, searchValue, setCurrentPage])

		useInfinityScroll(onScroll)

		useEffect(() => {
			collectionCatalogStore.setCollections(collections)
		}, [])

		const collectionsForIterate =
			collectionCatalogStore.collections.length || searchValue.length
				? collectionCatalogStore.collections
				: collections

		const autoCompleteMenu: AutocompleteMenu[] = useMemo(
			() =>
				collectionsForIterate?.map(collection => ({
					id: collection.id,
					name: collection.name
				})),
			[collectionsForIterate, searchValue]
		)

		return (
			<section className={styles.wrapper}>
				<div className={styles.container}>
					<Autocomplete
						name='search'
						menuList={autoCompleteMenu}
						width='100%'
						margin='0 0 15px 0'
						value={searchValue}
						onChange={onChangeSearchValue}
						placeholder='Поиск'
					/>
					<div className={styles.collections}>
						{collectionsForIterate.length ? (
							collectionsForIterate.map(collection => (
								<CollectionCard
									key={collection.id}
									collection={collection}
									myPage
								/>
							))
						) : (
							<p>По вашему запросу ничего не найдено</p>
						)}
					</div>
				</div>
			</section>
		)
	}
)
