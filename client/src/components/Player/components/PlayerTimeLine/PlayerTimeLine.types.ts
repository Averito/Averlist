import { PlayerInfo } from '@components/Player'
import { RefObject } from 'react'
import ReactPlayer from 'react-player'

export interface PlayerTimeLineProps {
	reactPlayerRef: RefObject<ReactPlayer>
	playerInfo: PlayerInfo
}
