import {
	ChangeEventHandler,
	FC,
	MouseEventHandler,
	useMemo,
	useRef
} from 'react'
import * as rdd from 'react-device-detect'
import cs from 'classnames'
import {
	BsFillVolumeDownFill,
	BsFillVolumeMuteFill,
	BsFillVolumeOffFill,
	BsFillVolumeUpFill
} from 'react-icons/bs'

import styles from './PlayerVolume.module.scss'
import { PlayerVolumeProps } from './PlayerVolume.types'
import { PlayerIcon } from '@components/Player/components'
import { useOutside } from '@hooks/useOutside'
import {
	RANGE_MAX,
	RANGE_MIN,
	RANGE_STEP
} from '@components/Player/components/PlayerVolume/PlayerVolume.config'

export const PlayerVolume: FC<PlayerVolumeProps> = ({
	volume,
	setVolume,
	setOpen,
	open
}) => {
	const volumeMenuRef = useRef<HTMLDivElement>(null)

	const toggleVolume: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		if (rdd.isDesktop) return
		setOpen(prevState => !prevState)
	}

	useOutside(volumeMenuRef, () => {
		setOpen(false)
	})

	let timeout = useRef<ReturnType<typeof setTimeout>>()
	const onMouseEnterVolume: MouseEventHandler<
		SVGElement | HTMLDivElement
	> = () => {
		if (rdd.isMobile) return

		clearTimeout(timeout.current)
		setOpen(true)
	}
	const onMouseLeaveVolume: MouseEventHandler<
		SVGElement | HTMLDivElement
	> = () => {
		if (rdd.isMobile) return

		timeout.current = setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

	const onClickVolumeMenu: MouseEventHandler<HTMLDivElement> = event => {
		event.stopPropagation()
	}

	const onClickMute: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()

		if (rdd.isMobile) return toggleVolume(event)
		setVolume(1)
	}

	const onClickVolume: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()

		if (rdd.isMobile) return toggleVolume(event)
		setVolume(0)
	}

	const onInputVolume: ChangeEventHandler<HTMLInputElement> = event => {
		setVolume((parseInt(event.currentTarget.value) || 0) / 100)
	}

	const backgroundSize = useMemo(
		() =>
			`${((volume * 100 - RANGE_MIN) * 100) / (RANGE_MAX - RANGE_MIN)}% 100%`,
		[volume]
	)

	return (
		<div className={styles.wrapper}>
			{volume === 1 && (
				<PlayerIcon
					icon={BsFillVolumeUpFill}
					onClick={onClickVolume}
					onMouseEnter={onMouseEnterVolume}
					onMouseLeave={onMouseLeaveVolume}
				/>
			)}
			{volume >= 0.5 && volume < 1 && (
				<PlayerIcon
					icon={BsFillVolumeDownFill}
					onClick={toggleVolume}
					onMouseEnter={onMouseEnterVolume}
					onMouseLeave={onMouseLeaveVolume}
				/>
			)}
			{volume > 0 && volume < 0.5 && (
				<PlayerIcon
					icon={BsFillVolumeOffFill}
					onClick={toggleVolume}
					onMouseEnter={onMouseEnterVolume}
					onMouseLeave={onMouseLeaveVolume}
				/>
			)}
			{volume === 0 && (
				<PlayerIcon
					icon={BsFillVolumeMuteFill}
					onClick={onClickMute}
					onMouseEnter={onMouseEnterVolume}
					onMouseLeave={onMouseLeaveVolume}
				/>
			)}

			<div
				ref={volumeMenuRef}
				className={cs(styles.volumeMenu, { [styles.open]: open })}
				onMouseEnter={onMouseEnterVolume}
				onMouseLeave={onMouseLeaveVolume}
				onClick={onClickVolumeMenu}
			>
				<input
					className={styles.volumeRange}
					style={{ backgroundSize }}
					onInput={onInputVolume}
					type='range'
					value={volume * 100}
					min={RANGE_MIN}
					max={RANGE_MAX}
					step={RANGE_STEP}
				/>
			</div>
		</div>
	)
}
