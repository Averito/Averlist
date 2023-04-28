import { RefObject } from 'react'
import ReactPlayer from 'react-player'

import { PlayerInfo, Quality } from '@components/Player'
import { SelectMenu } from '@components/Select'
import { SeriesUsually } from '@anilibriaApi/types'

export interface PlayerControlsProps {
	reactPlayerRef: RefObject<ReactPlayer>
	playerInfo: PlayerInfo
	playerStart: () => void
	playerStop: () => void
	id: string
	onPrevVideo?: () => void
	onNextVideo?: () => void
	setVolume: (volume: number) => void
	qualities: SelectMenu<Quality>[]
	currentQuality: SelectMenu<Quality>
	onChangeQuality?: (quality: SelectMenu<Quality>) => void
	currentSeries: SelectMenu<SeriesUsually>
	series: SelectMenu<SeriesUsually>[]
	onChangeSeries?: (series: SelectMenu<SeriesUsually>) => void
	playerFocus: boolean
}
