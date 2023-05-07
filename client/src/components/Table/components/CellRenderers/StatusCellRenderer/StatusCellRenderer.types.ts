import { ICellRendererParams } from 'ag-grid-community'
import { Averlist } from '@averlistApi/types'

export type StatusCellRendererProps = ICellRendererParams<
	Averlist.Anime,
	string
> & {
	openEditStatusModal: () => unknown
}
