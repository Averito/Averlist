import { Dispatch, SetStateAction } from 'react'
import { Series } from 'anilibria-api-wrapper'

import { SelectMenu } from '@components/Select'

export interface PlayerSeriesSelectProps {
	currentSeries: SelectMenu<Series>
	allSeries: SelectMenu<Series>[]
	onChangeSeries?: (series: SelectMenu<Series>) => void
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
