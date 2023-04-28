import {
	FC,
	MouseEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react'
import {
	BsFullscreen,
	BsFullscreenExit,
	BsPlayFill,
	BsSkipEndFill,
	BsSkipStartFill,
	BsStopFill
} from 'react-icons/bs'
import * as rdd from 'react-device-detect'
import cs from 'classnames'

import styles from './PlayerControls.module.scss'
import { PlayerControlsProps } from './PlayerControls.types'
import {
	PlayerIcon,
	PlayerOptions,
	PlayerSeriesSelect,
	PlayerTimeLine,
	PlayerVolume
} from '@components/Player/components'
import {
	BACK_FAST_FORWARD_TIME,
	FAST_FORWARD_TIME,
	HIDE_CONTROLS_ON_LEAVE_MOUSE_TIME,
	HIDE_CONTROLS_ON_MOVE_MOUSE_TIME
} from '@components/Player/components/PlayerControls/PlayerControls.config'
import { Flex } from '@components'
import { getTimeFromSeconds } from '@components/Player/components/PlayerControls/helpers/getTimeFromSeconds'

export const PlayerControls: FC<PlayerControlsProps> = ({
	reactPlayerRef,
	playerStart,
	playerStop,
	playerInfo,
	id,
	onNextVideo,
	onPrevVideo,
	onChangeQuality,
	qualities,
	currentQuality,
	setVolume,
	series,
	currentSeries,
	onChangeSeries,
	playerFocus
}) => {
	const [optionsMenuOpen, setOptionsMenuOpen] = useState<boolean>(false)
	const [volumeMenuOpen, setVolumeMenuOpen] = useState<boolean>(false)
	const [selectSeriesMenuOpen, setSelectSeriesMenuOpen] =
		useState<boolean>(false)
	const closeMenus = () => {
		setOptionsMenuOpen(false)
		setVolumeMenuOpen(false)
		setSelectSeriesMenuOpen(false)
	}

	const onClickWrapper = () => {
		if (playerInfo.playing) return playerStop()
		closeMenus()
		playerStart()
	}
	const onClickPlay: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		closeMenus()
		playerStart()
	}
	const onClickStop: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		closeMenus()
		playerStop()
	}

	const onClickPlayerToggle = () => {
		if (playerInfo.playing) return playerStop()
		playerStart()
	}

	const [fullscreen, setFullscreen] = useState<boolean>(false)

	const enterFullscreen = () => {
		closeMenus()

		const player = document.getElementById(id)
		if (!player) return

		void player.requestFullscreen()
		setFullscreen(true)
	}
	const onClickEnterFullscreen: MouseEventHandler<
		SVGElement | HTMLElement
	> = event => {
		event.stopPropagation()
		enterFullscreen()
	}
	const exitFullscreen = () => {
		closeMenus()

		void document.exitFullscreen()
		setFullscreen(false)
	}
	const onClickExitFullscreen: MouseEventHandler<
		SVGElement | HTMLElement
	> = event => {
		event.stopPropagation()
		exitFullscreen()
	}
	const requestFullscreen = () => {
		if (!fullscreen) {
			enterFullscreen()
			return
		}

		exitFullscreen()
	}

	const onDoubleClickWrapper: MouseEventHandler<HTMLDivElement> = () => {
		if (rdd.isMobile) return
		requestFullscreen()
	}

	const onClickNextVideo: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		closeMenus()
		onNextVideo?.()
	}

	const onClickPrevVideo: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		closeMenus()
		onPrevVideo?.()
	}

	const [show, setShow] = useState(false)
	let timeout: ReturnType<typeof setTimeout>

	const onMouseEnterOrMoveWrapper: MouseEventHandler<HTMLDivElement> = () => {
		if (timeout) clearTimeout(timeout)
		setShow(true)

		timeout = setTimeout(() => {
			setShow(false)
		}, HIDE_CONTROLS_ON_MOVE_MOUSE_TIME)
	}
	const onMouseLeaveWrapper: MouseEventHandler<HTMLDivElement> = () => {
		timeout = setTimeout(() => {
			setShow(false)
		}, HIDE_CONTROLS_ON_LEAVE_MOUSE_TIME)
	}

	const [controlsHover, setControlsHover] = useState<boolean>(false)

	const onMouseEnterOrMoveControls: MouseEventHandler<
		HTMLDivElement
	> = event => {
		event.stopPropagation()
		setControlsHover(true)
	}
	const onMouseLeaveControls: MouseEventHandler<HTMLDivElement> = event => {
		event.stopPropagation()
		setControlsHover(false)
	}

	const fastForward = () => {
		reactPlayerRef.current?.seekTo?.(
			playerInfo.playedInSeconds + FAST_FORWARD_TIME
		)
	}
	const backFastForward = () => {
		reactPlayerRef.current?.seekTo?.(
			playerInfo.playedInSeconds - BACK_FAST_FORWARD_TIME
		)
	}

	const handleHotKeys = useCallback(
		(event: KeyboardEvent) => {
			if (!playerFocus) return

			if (event.code === 'KeyF') requestFullscreen()
			if (event.code === 'Space') onClickPlayerToggle()
			if (event.code === 'ArrowRight') fastForward()
			if (event.code === 'ArrowLeft') backFastForward()
		},
		[playerFocus, requestFullscreen, onClickPlayerToggle]
	)

	useEffect(() => {
		window.addEventListener('keydown', handleHotKeys)
		return () => window.removeEventListener('keydown', handleHotKeys)
	}, [handleHotKeys])

	const duration = useMemo(
		() => getTimeFromSeconds(reactPlayerRef.current?.getDuration() || 0),
		[reactPlayerRef.current?.getDuration()]
	)
	const playedTime = useMemo(
		() =>
			getTimeFromSeconds(
				playerInfo.played * (reactPlayerRef.current?.getDuration() || 0)
			),
		[playerInfo, reactPlayerRef.current?.getDuration()]
	)

	const showControls =
		!playerInfo.playing ||
		show ||
		(controlsHover && !rdd.isMobile) ||
		optionsMenuOpen

	return (
		<div
			className={cs(styles.wrapper, { [styles.show]: !showControls })}
			onClick={onClickWrapper}
			onDoubleClick={onDoubleClickWrapper}
			onMouseEnter={onMouseEnterOrMoveWrapper}
			onMouseMove={onMouseEnterOrMoveWrapper}
			onMouseLeave={onMouseLeaveWrapper}
		>
			<div
				onMouseMove={onMouseEnterOrMoveControls}
				onMouseEnter={onMouseEnterOrMoveControls}
				onMouseLeave={onMouseLeaveControls}
				className={cs(styles.topLayer, {
					[styles.show]: showControls
				})}
			>
				<PlayerSeriesSelect
					allSeries={series}
					currentSeries={currentSeries}
					onChangeSeries={onChangeSeries}
					open={selectSeriesMenuOpen}
					setOpen={setSelectSeriesMenuOpen}
				/>
			</div>
			<div
				onMouseMove={onMouseEnterOrMoveControls}
				onMouseEnter={onMouseEnterOrMoveControls}
				onMouseLeave={onMouseLeaveControls}
				className={cs(styles.bottomLayerWrapper, {
					[styles.show]: showControls
				})}
			>
				<PlayerTimeLine
					reactPlayerRef={reactPlayerRef}
					playerInfo={playerInfo}
				/>
				<div className={styles.bottomLayerContainer}>
					<div className={styles.bottomLayerControls}>
						{onPrevVideo && (
							<PlayerIcon icon={BsSkipStartFill} onClick={onClickPrevVideo} />
						)}
						{playerInfo.playing ? (
							<PlayerIcon icon={BsStopFill} onClick={onClickStop} />
						) : (
							<PlayerIcon icon={BsPlayFill} onClick={onClickPlay} />
						)}
						{onNextVideo && (
							<PlayerIcon icon={BsSkipEndFill} onClick={onClickNextVideo} />
						)}

						<Flex className={styles.time} alignItems='center'>
							{playedTime}
							<p className={styles.timeSlash}>/</p>
							{duration}
						</Flex>
					</div>
					<div className={styles.bottomLayerOther}>
						<PlayerVolume
							volume={playerInfo.volume}
							setVolume={setVolume}
							open={volumeMenuOpen}
							setOpen={setVolumeMenuOpen}
						/>
						<PlayerOptions
							open={optionsMenuOpen}
							setOpen={setOptionsMenuOpen}
							qualities={qualities}
							currentQuality={currentQuality}
							onChangeQuality={onChangeQuality}
						/>
						{fullscreen ? (
							<PlayerIcon
								icon={BsFullscreenExit}
								size={16}
								onClick={onClickExitFullscreen}
							/>
						) : (
							<PlayerIcon
								icon={BsFullscreen}
								size={16}
								onClick={onClickEnterFullscreen}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
