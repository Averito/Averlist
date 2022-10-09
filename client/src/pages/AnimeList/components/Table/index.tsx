import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { FC, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { observer } from 'mobx-react-lite'

import styles from './Table.module.scss'
import { Averlist } from '@averlistApi/types'
import { StatusCellRenderer } from '@pages/AnimeList/components/Table/components/StatusCellRenderer'
import animeListStore from '@stores/animeList.store'

export const Table: FC = observer(() => {
	const defaultColDefs: ColDef<Averlist.Anime> = {
		headerClass: styles.header,
		cellClass: styles.visible
	}

	const colDefs: ColDef<Averlist.Anime>[] = [
		{ field: 'name', headerName: 'Название', sortable: true },
		{
			field: 'status',
			headerName: 'Статус',
			cellRenderer: StatusCellRenderer
		},
		{ field: '', headerName: '' }
	]

	const gridContainerRef = useRef<HTMLDivElement>(null)

	const onGridReady = (event: GridReadyEvent<Averlist.Anime>) => {
		if (!gridContainerRef.current) return

		event.columnApi.sizeColumnsToFit(gridContainerRef.current.clientWidth)
	}

	return (
		<div ref={gridContainerRef} className='ag-theme-alpine' style={{ height: 500, margin: '5px 0 0 0' }}>
			<AgGridReact
				defaultColDef={defaultColDefs}
				columnDefs={colDefs}
				rowData={animeListStore.animeList}
				onGridReady={onGridReady}
				headerHeight={35}
				rowSelection='multiple'
				suppressRowTransform
				animateRows
			/>
		</div>
	)
})
