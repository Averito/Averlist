import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Select } from 'antd'

import styles from './styled.module.scss'
import { SeriesUsually, Title } from 'api/anilibriaApi/types'
import { Resolutions, ProgressPlayer } from './types'

interface PlayerProps {
	titleMain: Title
	width?: number
	height?: number
}

export const Player: FC<PlayerProps> = ({ titleMain, width, height }) => {
	const existTitleName = localStorage.getItem(titleMain?.names?.ru)
	const oldFormatDate: string = JSON.parse(
		JSON.stringify(localStorage.getItem(titleMain?.names?.ru))
	)
	// Проверяем есть ли такой ключ в localStorage или соответствуют ли данные в localStorage старому формату
	if (!existTitleName || !oldFormatDate.includes('{')) {
		const localStorageAnimeData = JSON.stringify({ series: 0, timing: 0 })
		localStorage.setItem(titleMain?.names?.ru, localStorageAnimeData)
	}

	const [selectedSeries, setSelectedSeries] = useState<number>(
		JSON.parse(localStorage.getItem(titleMain?.names?.ru) as string).series
	)
	const [timingFromLocalStorage, setTimingFromLocalStorage] = useState<number>(
		JSON.parse(localStorage.getItem(titleMain?.names?.ru) as string).timing
	)
	const [playlistSeriesArray, setPlayListSeriesArray] = useState<
		SeriesUsually[]
	>([])
	const [resolution, setResolution] = useState<Resolutions>('hd')

	const playerRef = useRef<ReactPlayer>(null)

	useEffect(() => {
		const { series, timing } = JSON.parse(
			localStorage.getItem(titleMain?.names?.ru) as string
		)
		const arr: SeriesUsually[] = []

		if (titleMain?.player?.playlist) {
			Object.entries<SeriesUsually>(titleMain?.player?.playlist).forEach(
				elem => {
					arr.push(elem[1])
				}
			)
		}

		setPlayListSeriesArray(arr)
		setSelectedSeries(series)
		setTimingFromLocalStorage(timing)
	}, [titleMain?.player?.playlist, titleMain?.names?.ru])

	const onChangeSelect = (value: number) => {
		setSelectedSeries(value)
		setTimingFromLocalStorage(0)
		const localStorageAnimeData = JSON.stringify({ series: value, timing: 0 })
		localStorage.setItem(titleMain?.names?.ru, localStorageAnimeData)
	}
	const onChangeResolution = (value: Resolutions) => {
		setResolution(value)
	}

	const onProgressPlayer = (value: ProgressPlayer) => {
		if (!(value.playedSeconds !== 0)) return
		setTimingFromLocalStorage(value.playedSeconds)
		const localStorageAnimeData = JSON.stringify({
			series: selectedSeries,
			timing: value.playedSeconds
		})
		localStorage.setItem(titleMain?.names?.ru, localStorageAnimeData)
	}

	const onStartPlayer = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(+timingFromLocalStorage)
		}
	}

	const formattedPlaylistSeriesArray = playlistSeriesArray.map(series => ({
		hd: `https://${titleMain?.player?.host}${series.hls?.hd}`,
		sd: `https://${titleMain?.player?.host}${series.hls?.sd}`
	}))

	return (
		<div className={styles.playerWrapper}>
			<div className={styles.playerSelects}>
				<Select defaultValue='hd' onChange={onChangeResolution}>
					<Select.Option value='hd'>720p</Select.Option>
					<Select.Option value='sd'>480p</Select.Option>
				</Select>
				<Select value={selectedSeries} onChange={onChangeSelect}>
					{formattedPlaylistSeriesArray.map((elem, idx) => (
						<Select.Option value={idx} key={idx}>
							{idx + 1} серия
						</Select.Option>
					))}
				</Select>
			</div>
			<ReactPlayer
				ref={playerRef}
				url={
					formattedPlaylistSeriesArray &&
					formattedPlaylistSeriesArray[selectedSeries] &&
					formattedPlaylistSeriesArray[selectedSeries][resolution]
				}
				controls={true}
				width={width}
				height={height}
				onProgress={onProgressPlayer}
				onStart={onStartPlayer}
			/>
		</div>
	)
}
