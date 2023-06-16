import { FC, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'

import styles from './CollectionsCreateSelectAnime.module.scss'
import { Averlist } from '@averlistApi/types'
import { NameCellRenderer } from '@components/Table/components/CellRenderers'
import animeListStore from '@stores/animeList.store'
import { defineEmits } from '@helpers/defineEmits'
import { Flex } from '@components/Flex'
import { Input } from '@components/Input'
import { useInput } from '@hooks/useInput'

const Table = dynamic(() => import('@components/Table/Table'), { ssr: false })

interface CollectionsCreateSelectAnimeProps {
	active?: boolean
	onChange: (newIds: string[]) => void
}

export const CollectionsCreateSelectAnime: FC<CollectionsCreateSelectAnimeProps> =
	observer(({ active, onChange }) => {
		const [gridApi, setGridApi] = useState<GridApi<Averlist.Anime> | null>(null)

		const emit = defineEmits<'change'>({
			change: onChange
		})

		const colDefs: ColDef<Averlist.Anime>[] = [
			{
				field: 'name',
				headerName: 'Название',
				cellRenderer: NameCellRenderer,
				tooltipField: 'name',
				headerCheckboxSelection: true,
				checkboxSelection: true
			}
		]

		const onGridReady = (event: GridReadyEvent<Averlist.Anime>) => {
			setGridApi(event.api)
		}

		const onSelectionChange = () => {
			if (!gridApi) return
			emit(
				'change',
				gridApi.getSelectedRows().map(anime => anime.id)
			)
		}

		const [searchValue, setSearchValue] = useInput()

		const filteredAnimeList = useMemo(
			() =>
				animeListStore.anilibriaAnimeList.filter(anime =>
					anime.name.toLowerCase().includes(searchValue.toLowerCase())
				),
			[searchValue, animeListStore.anilibriaAnimeList]
		)

		return (
			<Flex
				className={classNames(styles.wrapper, {
					[styles.active]: active
				})}
				flexDirection='column'
				margin='20px 0'
				width='100%'
			>
				<Input
					type='text'
					width='100%'
					placeholder='Поиск'
					value={searchValue}
					onChange={setSearchValue}
				/>
				<Table
					height='100%'
					columnDefs={colDefs}
					rowData={filteredAnimeList}
					rowSelection='multiple'
					onGridReady={onGridReady}
					onSelectionChanged={onSelectionChange}
				/>
			</Flex>
		)
	})
