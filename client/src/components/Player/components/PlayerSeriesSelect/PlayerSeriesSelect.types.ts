import { SelectMenu } from '@components/Select'
import { SeriesUsually } from '@anilibriaApi/types'

export interface PlayerSeriesSelectProps {
	currentSeries: SelectMenu<SeriesUsually>
	series: SelectMenu<SeriesUsually>[]
	onChangeSeries: (series: SelectMenu<SeriesUsually>) => void
}
