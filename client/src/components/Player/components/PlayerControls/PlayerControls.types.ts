import { MouseEventHandler, RefObject } from 'react'
import ReactPlayer from 'react-player'
import { PlayerInfo, Quality } from '@components/Player'
import { SelectMenu } from '@components/Select'

export interface PlayerControlsProps {
	reactPlayerRef: RefObject<ReactPlayer>
	playerInfo: PlayerInfo
	playerStart: () => void
	playerStop: () => void
	id: string
	onNextVideo?: MouseEventHandler<SVGElement>
	onPrevVideo?: MouseEventHandler<SVGElement>
	setVolume: (volume: number) => void
	qualities: SelectMenu<Quality>[]
	currentQuality: SelectMenu<Quality>
	onChangeQuality?: (quality: SelectMenu<Quality>) => void
	playerFocus: boolean
}
