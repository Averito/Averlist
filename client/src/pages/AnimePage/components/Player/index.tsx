import { FC, useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'

import { SeriesUsually, Title } from '@anilibriaApi/types'
import { Flex } from '@components/Flex'
import { SelectMenu } from '@components/Select'
import { PlayerRef, Quality, SeriesInfo } from '@components/Player'
import { useCache } from '@hooks/useCache'
import { Player as MyPlayer } from '@components'

const initialQualities = [
	{
		id: 0,
		label: '420p',
		value: 'sd' as Quality
	},
	{
		id: 1,
		label: '720p',
		value: 'hd' as Quality
	}
]

interface PlayerProps {
	title: Title
	margin?: string
}

const Player: FC<PlayerProps> = ({ title, margin }) => {
	const player = useRef<PlayerRef>(null)

	// Series
	const [allSeries, setAllSeries] = useState<SelectMenu<SeriesUsually>[]>([])

	const changeSeries = (series: SelectMenu<SeriesUsually>) => {
		setSeriesInfo(prevSeriesInfo => ({
			...prevSeriesInfo,
			time: 0,
			series
		}))
	}

	const onClickNextSeries = () => {
		setSeriesInfo(prevSeriesInfo => {
			let nextSeries = allSeries.find(
				series => series.id === prevSeriesInfo.series.id + 1
			)
			if (!nextSeries) {
				nextSeries = allSeries[0]
			}

			return {
				...prevSeriesInfo,
				time: 0,
				series: nextSeries
			}
		})
	}

	const onClickPrevSeries = () => {
		setSeriesInfo(prevSeriesInfo => {
			let prevSeries = allSeries.find(
				series => series.id === prevSeriesInfo.series.id - 1
			)
			if (!prevSeries) {
				prevSeries = allSeries.at(-1) as SelectMenu<SeriesUsually>
			}

			return {
				...prevSeriesInfo,
				time: 0,
				series: prevSeries
			}
		})
	}
	// Series

	// Quality
	const [qualities, setQualities] =
		useState<SelectMenu<Quality>[]>(initialQualities)
	const changeQuality = (quality: SelectMenu<Quality>) => {
		setSeriesInfo(prevSeriesInfo => ({
			...prevSeriesInfo,
			quality: quality
		}))
	}
	// Quality

	const firstSeriesNum = +Object.keys(title.player.playlist)[0]
	const [seriesInfo, setSeriesInfo] = useState<SeriesInfo>({
		series: {
			id: 0,
			label: `${title.player.playlist[firstSeriesNum].serie} серия`,
			value: title.player.playlist[firstSeriesNum]
		},
		quality: qualities[0],
		time: 0
	})

	const onExtractCache = (cache: SeriesInfo, isCacheEmpty: boolean) => {
		if (isCacheEmpty) return

		setSeriesInfo(cache)
	}
	useCache<SeriesInfo>(seriesInfo, title.code, onExtractCache)

	useEffect(() => {
		const playlistMap = new Map<string, SeriesUsually>(
			Object.entries(title.player.playlist)
		)

		let normalizeAllSeries: SelectMenu<SeriesUsually>[] = []

		for (const series of playlistMap.values()) {
			normalizeAllSeries.push({
				id: series.serie,
				label: `${series.serie} серия`,
				value: series
			})
		}
		setAllSeries(normalizeAllSeries)
	}, [])

	useEffect(() => {
		const hasFhdQuality =
			qualities.findIndex(quality => quality.value === 'fhd') !== -1
		const seriesHasFhdQuality = !!seriesInfo.series.value.hls?.fhd

		if (!hasFhdQuality && !seriesHasFhdQuality) return
		if (hasFhdQuality && !seriesHasFhdQuality) {
			return setQualities(prevState => prevState.slice(0, 2))
		}
		if (hasFhdQuality && seriesHasFhdQuality) return

		setQualities(prevState => [
			...prevState,
			{
				id: 3,
				label: '1080p',
				value: 'fhd'
			}
		])
	}, [seriesInfo.series.value.hls?.fhd])

	const onProgressPlayer = (progress: OnProgressProps) => {
		if (progress.playedSeconds === 0) return

		setSeriesInfo(prevSeriesInfo => ({
			...prevSeriesInfo,
			time: progress.playedSeconds
		}))
	}

	const onStartPlayer = () => {
		player.current?.seekTo?.(seriesInfo.time || 0)
	}

	const host = title.player.host
	const videoUrl = `https://${host}${
		(seriesInfo.series.value as SeriesUsually)?.hls[seriesInfo.quality.value]
	}`

	return (
		<Flex margin={margin}>
			<MyPlayer
				ref={player}
				url={videoUrl}
				width='100%'
				height='auto'
				controls
				qualities={qualities}
				currentQuality={seriesInfo.quality}
				onChangeQuality={changeQuality}
				allSeries={allSeries}
				currentSeries={seriesInfo.series}
				onChangeSeries={changeSeries}
				onProgress={onProgressPlayer}
				onStart={onStartPlayer}
				onNextVideo={onClickNextSeries}
				onPrevVideo={onClickPrevSeries}
			/>
		</Flex>
	)
}

export default Player
