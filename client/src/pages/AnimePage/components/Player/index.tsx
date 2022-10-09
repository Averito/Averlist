import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import ReactPlayer from 'react-player'

import { SeriesUsually, Title } from '@anilibriaApi/types'
import { Flex } from '@components/Flex'
import { Select, SelectMenu } from '@components/Select'
import { anilibria } from '@anilibriaApi/anilibria'
import { Quality, SeriesInfo } from '@pages/AnimePage/components/Player/types'
import { useCache } from '@hooks/useCache'

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

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

interface PlayerProps {
	title: Title
	margin?: string
}

const Player: FC<PlayerProps> = ({ title, margin }) => {
	// Series
	const [allSeries, setAllSeries] = useState<SelectMenu<SeriesUsually>[]>([])
	const onChangeSeriesSelect = (series: SelectMenu<SeriesUsually>) => {
		return () => {
			setSeriesInfo(prevSeriesInfo => ({
				...prevSeriesInfo,
				series
			}))
		}
	}
	// Series

	// Quality
	const [qualities, setQualities] =
		useState<SelectMenu<Quality>[]>(initialQualities)
	const onChangeQualitySelect = (quality: SelectMenu<Quality>) => {
		return () => {
			setSeriesInfo(prevSeriesInfo => ({
				...prevSeriesInfo,
				quality: quality
			}))
		}
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

	const player = useRef<ReactPlayer>(null)
	const onStartPlayer = () => {
		player.current?.seekTo(seriesInfo.time || 0)
	}

	const host = title.player.host
	const videoUrl = `https://${host}${
		(seriesInfo.series.value as SeriesUsually)?.hls[seriesInfo.quality.value]
	}`

	return (
		<Flex margin={margin} flexDirection='column'>
			<Flex>
				<Select
					options={qualities}
					currentOption={seriesInfo.quality}
					onChange={onChangeQualitySelect}
					margin='0 4px 0 0'
				/>
				<Select
					options={allSeries}
					currentOption={seriesInfo.series}
					onChange={onChangeSeriesSelect}
				/>
			</Flex>
			<ReactPlayer
				ref={player}
				url={videoUrl}
				width='100%'
				height='auto'
				controls
				onProgress={onProgressPlayer}
				onStart={onStartPlayer}
			/>
		</Flex>
	)
}

export default Player
