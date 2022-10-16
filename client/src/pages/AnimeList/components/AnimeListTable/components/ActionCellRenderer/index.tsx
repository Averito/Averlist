import { ICellRendererParams } from 'ag-grid-community'
import { FC } from 'react'

type ActionCellRendererProps = ICellRendererParams

export const ActionCellRenderer: FC<ActionCellRendererProps> = () => {
	return <p>Удалить</p>
}
