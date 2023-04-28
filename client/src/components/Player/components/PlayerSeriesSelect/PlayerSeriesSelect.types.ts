import { Dispatch, SetStateAction } from 'react'

import { SelectMenu } from '@components/Select'
import { SeriesUsually } from '@anilibriaApi/types'

export interface PlayerSeriesSelectProps {
	currentSeries: SelectMenu<SeriesUsually>
	allSeries: SelectMenu<SeriesUsually>[]
	onChangeSeries?: (series: SelectMenu<SeriesUsually>) => void
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
