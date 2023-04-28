import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import ReactPlayer from 'react-player'

import styles from './Player.module.scss'
import {
	PlayerInfo,
	PlayerProps,
	PlayerRef
} from '@components/Player/Player.types'
import { PlayerControls } from '@components/Player/components'
import { useCache } from '@hooks/useCache'

export const Player = forwardRef<PlayerRef, PlayerProps>(
	(
		{
			margin,
			qualities,
			currentQuality,
			onChangeQuality,
			id = 'react-player',
			onPrevVideo,
			onNextVideo,
			onProgress,
			series,
			currentSeries,
			onChangeSeries,
			...props
		},
		ref
	) => {
		const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
			playing: false,
			muted: false,
			volume: 1,
			played: 0,
			playedInSeconds: 0,
			loaded: 0
		})

		useCache<number>(
			playerInfo.volume,
			'player-volume',
			(cache, isCacheEmpty) => {
				if (isCacheEmpty) return
				setPlayerInfo(prevState => ({ ...prevState, volume: cache }))
			}
		)

		const playerStart = () => {
			setPlayerInfo(prevState => ({ ...prevState, playing: true }))
		}
		const playerStop = () => {
			setPlayerInfo(prevState => ({ ...prevState, playing: false }))
		}

		const reactPlayerRef = useRef<ReactPlayer>(null)
		useImperativeHandle(
			ref,
			() => ({
				...reactPlayerRef.current,
				start: playerStart,
				stop: playerStop
			}),
			[reactPlayerRef]
		)

		const onProgressModify = (state: OnProgressProps) => {
			setPlayerInfo(prevState => ({
				...prevState,
				played: state.played,
				playedInSeconds: state.playedSeconds,
				loaded: state.loaded
			}))
			onProgress(state)
		}

		const setVolume = (volume: number) => {
			setPlayerInfo(prevState => ({ ...prevState, volume }))
		}

		const [playerFocus, setPlayerFocus] = useState<boolean>(false)

		const onFocusPlayer = () => {
			setPlayerFocus(true)
		}
		const onBlurPlayer = () => {
			setPlayerFocus(false)
		}

		return (
			<div
				className={styles.playerContainer}
				tabIndex={1}
				onFocus={onFocusPlayer}
				onBlur={onBlurPlayer}
				id={id}
			>
				<ReactPlayer
					{...props}
					{...playerInfo}
					onProgress={onProgressModify}
					ref={reactPlayerRef}
					controls={false}
				/>
				<PlayerControls
					setVolume={setVolume}
					qualities={qualities}
					currentQuality={currentQuality}
					onChangeQuality={onChangeQuality}
					series={series}
					currentSeries={currentSeries}
					onChangeSeries={onChangeSeries}
					reactPlayerRef={reactPlayerRef}
					playerInfo={playerInfo}
					playerStart={playerStart}
					playerStop={playerStop}
					onNextVideo={onNextVideo}
					onPrevVideo={onPrevVideo}
					playerFocus={playerFocus}
					id={id}
				/>
			</div>
		)
	}
)
