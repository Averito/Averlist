import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { Series } from 'anilibria-api-wrapper'

import { SelectMenu } from '@components/Select'

type ReactPlayerPropsWithoutPlayerInfo = Omit<
	ReactPlayerProps,
	'playing' | 'muted' | 'volume' | 'played'
>

export interface PlayerProps extends ReactPlayerPropsWithoutPlayerInfo {
	margin?: string
	id?: string
	onPrevVideo?: () => void
	onNextVideo?: () => void
	qualities: SelectMenu<Quality>[]
	currentQuality: SelectMenu<Quality>
	onChangeQuality?: (quality: SelectMenu<Quality>) => void
	currentSeries: SelectMenu<Series>
	allSeries: SelectMenu<Series>[]
	onChangeSeries?: (series: SelectMenu<Series>) => void
}

export interface PlayerRef extends Partial<ReactPlayer> {
	start: () => void
	stop: () => void
}

export interface PlayerInfo {
	playing: boolean
	muted: boolean
	volume: number
	played: number
	playedInSeconds: number
	loaded: number
}

export type Quality = 'sd' | 'hd' | 'fhd'

export interface SeriesInfo {
	series: SelectMenu<Series>
	quality: SelectMenu<Quality>
	time: number
}
