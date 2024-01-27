import { FC, useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import { Series, Title } from 'anilibria-api-wrapper'

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
	const [allSeries, setAllSeries] = useState<SelectMenu<Series>[]>([])

	const changeSeries = (series: SelectMenu<Series>) => {
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
				prevSeries = allSeries.at(-1) as SelectMenu<Series>
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

	const [seriesInfo, setSeriesInfo] = useState<SeriesInfo>({
		series: {
			id: 0,
			label: `${title.player.playlist[0]?.serie} серия`,
			value: title.player.playlist[0]
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
		const playlistMap = new Map<string, Series>(
			Object.entries(title.player.playlist)
		)

		let normalizeAllSeries: SelectMenu<Series>[] = []

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
		const seriesHasFhdQuality = !!seriesInfo.series.value?.hls?.fhd

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
	}, [seriesInfo.series.value?.hls?.fhd])

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
		(seriesInfo.series.value as Series)?.hls[seriesInfo.quality.value]
	}`

	const rutubeWarning =
		title.player.rutube_playlist?.length !== 0 &&
		title.player.playlist.length === 0

	return (
		<Flex margin={margin}>
			{title.player.playlist.length !== 0 && (
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
			)}
			{rutubeWarning && (
				<p>
					У данного аниме отсутствуют прямые ссылки на серию, только rutube, а
					данный способ просмотра аниме пока не поддерживается.
				</p>
			)}
		</Flex>
	)
}

export default Player
