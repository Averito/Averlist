import { FC, useEffect, useRef, useState } from 'react'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'

import styles from './Table.module.scss'
import { useWindowSize } from '@hooks/useWindowSize'
import { ColDef, ColumnApi, GridReadyEvent } from 'ag-grid-community'
import { Averlist } from '@averlistApi/types'
import { defineEmits } from '@helpers/defineEmits'
import { Property } from 'csstype'

type TableProps = AgGridReactProps & {
	height: Property.Height
}

const Table: FC<TableProps> = props => {
	const { width, isMobile } = useWindowSize()

	const gridContainerRef = useRef<HTMLDivElement>(null)
	const [columnApi, setColumnApi] = useState<ColumnApi | null>(null)

	const emit = defineEmits<'gridReady'>({
		gridReady: props.onGridReady ?? (() => {})
	})

	useEffect(() => {
		if (isMobile) return columnApi?.autoSizeAllColumns()
		if (!gridContainerRef.current) return

		columnApi?.sizeColumnsToFit(gridContainerRef.current.clientWidth)
	}, [width, isMobile])

	const onGridReady = (event: GridReadyEvent<Averlist.Anime>) => {
		setColumnApi(event.columnApi)

		emit('gridReady', event)

		if (!gridContainerRef.current) return
		event.columnApi.sizeColumnsToFit(gridContainerRef.current.clientWidth)
	}

	const defaultColDefs: ColDef<Averlist.Anime> = {
		headerClass: styles.header,
		cellClass: styles.visible,
		...props.defaultColDef
	}

	return (
		<div
			ref={gridContainerRef}
			className='ag-theme-alpine'
			style={{ height: props.height }}
		>
			<AgGridReact
				{...props}
				defaultColDef={defaultColDefs}
				onGridReady={onGridReady}
			/>
		</div>
	)
}

export default Table
