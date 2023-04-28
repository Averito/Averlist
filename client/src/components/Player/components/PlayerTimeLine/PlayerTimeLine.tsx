import { ChangeEventHandler, FC, MouseEventHandler } from 'react'

import styles from './PlayerTimeLine.module.scss'
import { PlayerTimeLineProps } from './PlayerTimeLine.types'
import {
	TIMELINE_MAX,
	TIMELINE_MIN,
	TIMELINE_STEP
} from './PlayerTimeLine.config'

export const PlayerTimeLine: FC<PlayerTimeLineProps> = ({
	reactPlayerRef,
	playerInfo
}) => {
	const played = playerInfo.played * 100
	const playedLineWidth = `${played}%`
	const backgroundSize = `${Math.floor(playerInfo.loaded * 100)}% 100%`

	const onClickTimeLine: MouseEventHandler<HTMLDivElement> = event => {
		event.stopPropagation()
	}

	const onInputTimeLine: ChangeEventHandler<HTMLInputElement> = event => {
		event.stopPropagation()

		reactPlayerRef.current?.seekTo?.(
			parseInt(event.currentTarget.value) / 100,
			'fraction'
		)
	}

	return (
		<div className={styles.wrapper} onClick={onClickTimeLine}>
			<div
				className={styles.timelinePlayedLine}
				style={{ width: playedLineWidth }}
			/>
			<input
				className={styles.timeline}
				style={{ backgroundSize }}
				type='range'
				onInput={onInputTimeLine}
				min={TIMELINE_MIN}
				max={TIMELINE_MAX}
				step={TIMELINE_STEP}
				value={played}
			/>
		</div>
	)
}
