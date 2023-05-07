import { RefObject } from 'react'
import ReactPlayer from 'react-player'
import { Series } from 'anilibria-api-wrapper'

import { PlayerInfo, Quality } from '@components/Player'
import { SelectMenu } from '@components/Select'

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
	currentSeries: SelectMenu<Series>
	series: SelectMenu<Series>[]
	onChangeSeries?: (series: SelectMenu<Series>) => void
	playerFocus: boolean
}
