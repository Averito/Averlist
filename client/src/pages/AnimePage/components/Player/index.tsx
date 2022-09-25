import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { OnProgressProps } from 'react-player/base'
import ReactPlayer from 'react-player'

import { SeriesUsually, Title } from '@anilibriaApi/types'
import { Flex } from '@components/Flex'
import { Select, SelectMenu } from '@components/Select'
import { anilibria } from '@anilibriaApi/anilibria'
import { Quality, SeriesInfo } from '@pages/AnimePage/components/Player/types'

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
	const [seriesInfo, setSeriesInfo] = useState<SeriesInfo>({} as SeriesInfo)
	const [titlePlayer, setTitlePlayer] = useState<Title>(title)
	const [allSeries, setAllSeries] = useState<SelectMenu<SeriesUsually>[]>([])
	const [currentSeries, setCurrentSeries] = useState<SelectMenu<SeriesUsually>>(
		{
			id: 0,
			label: `${titlePlayer.player.playlist[1].serie} серия`,
			value: titlePlayer.player.playlist[1]
		}
	)
	const [qualities, setQualities] =
		useState<SelectMenu<Quality>[]>(initialQualities)
	const [currentQuality, setCurrentQuality] = useState<SelectMenu<Quality>>(
		qualities[1]
	)

	const updateSeriesInfo = useCallback(
		(time: number = 0) => {
			localStorage.setItem(
				title.code,
				JSON.stringify({
					series: currentSeries.value.serie,
					quality: currentQuality.value,
					time
				})
			)
		},
		[currentQuality.value, currentSeries.value.serie, title.code]
	)

	const onChangeSeriesSelect = (series: SelectMenu<SeriesUsually>) => {
		return () => {
			setCurrentSeries(series)
			updateSeriesInfo()
		}
	}
	const onChangeQualitySelect = (quality: SelectMenu<Quality>) => {
		return () => {
			setCurrentQuality(quality)
		}
	}

	const selectCurrentSeries = useCallback(
		(allSeries: SelectMenu<SeriesUsually>[]) => {
			const newSeriesInfo = JSON.parse(
				localStorage.getItem(title.code) as string
			) as SeriesInfo | null
			if (!newSeriesInfo) {
				updateSeriesInfo()
				return
			}

			const foundCurrentSeries = allSeries.find(
				series => series.value.serie === newSeriesInfo.series
			)
			const foundCurrentQuality = qualities.find(
				quality => quality.value === newSeriesInfo.quality
			)
			if ((!foundCurrentSeries && !currentQuality) || !foundCurrentSeries)
				return updateSeriesInfo()

			setCurrentSeries(foundCurrentSeries)
			if (foundCurrentQuality) setCurrentQuality(foundCurrentQuality)

			setSeriesInfo(newSeriesInfo)
		},
		[currentQuality, qualities, title.code, updateSeriesInfo]
	)

	useEffect(() => {
		const allSeriesForSelect: SelectMenu<SeriesUsually>[] = []

		for (const series of Object.entries(title.player.playlist)) {
			const idx = +series[0]
			allSeriesForSelect.push({
				id: idx,
				label: `${series[1].serie} серия`,
				value: series[1] as SeriesUsually
			})
		}

		setAllSeries(allSeriesForSelect)
		selectCurrentSeries(allSeriesForSelect)
	}, [title.player.playlist, selectCurrentSeries])

	useEffect(() => {
		const asyncWrapper = async () => {
			const title = await anilibria.getTitle({
				filter: ['player', 'id'],
				id: titlePlayer.id
			})
			setTitlePlayer(title)
		}
		asyncWrapper()
	}, [titlePlayer.id])

	useEffect(() => {
		const hasFhdQuality =
			qualities.findIndex(quality => quality.value === 'fhd') !== -1
		const seriesHasFhdQuality = !!currentSeries.value?.hls?.fhd

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
	}, [currentSeries.value?.hls?.fhd, qualities])

	const onProgressPlayer = (progress: OnProgressProps) => {
		updateSeriesInfo(progress.playedSeconds)
	}

	const player = useRef<ReactPlayer>(null)
	const onStartPlayer = () => {
		player.current?.seekTo(seriesInfo.time || 0)
	}

	const host = title.player.host
	const videoUrl = `https://${host}${
		(currentSeries.value as SeriesUsually)?.hls[currentQuality.value]
	}`

	return (
		<Flex margin={margin} flexDirection='column'>
			<Flex>
				<Select
					options={qualities}
					currentOption={currentQuality}
					onChange={onChangeQualitySelect}
					margin='0 4px 0 0'
				/>
				<Select
					options={allSeries}
					currentOption={currentSeries}
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
