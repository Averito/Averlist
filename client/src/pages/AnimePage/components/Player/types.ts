import { SelectMenu } from '@components/Select'
import { SeriesUsually } from '@anilibriaApi/types'

export type Quality = 'sd' | 'hd' | 'fhd'

export interface SeriesInfo {
	series: SelectMenu<SeriesUsually>
	quality: SelectMenu<Quality>
	time: number
}
