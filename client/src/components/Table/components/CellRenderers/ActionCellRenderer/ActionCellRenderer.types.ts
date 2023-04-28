import { ICellRendererParams } from 'ag-grid-community'
import { Averlist } from '@averlistApi/types'

export interface ActionCellRendererProps
	extends ICellRendererParams<Averlist.Anime> {
	removeAnime: (animeId: string, animeName: string) => unknown
}
