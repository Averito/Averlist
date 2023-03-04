import { FC, useState } from 'react'
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

const Table = dynamic(() => import('@components/Table'), { ssr: false })

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

		return (
			<Flex
				customClassName={classNames(styles.wrapper, {
					[styles.active]: active
				})}
				margin='20px 0'
				width='100%'
			>
				<Table
					height='100%'
					columnDefs={colDefs}
					rowData={animeListStore.anilibriaAnimeList}
					rowSelection='multiple'
					onGridReady={onGridReady}
					onSelectionChanged={onSelectionChange}
				/>
			</Flex>
		)
	})
