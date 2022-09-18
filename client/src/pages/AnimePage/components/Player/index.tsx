import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import { SeriesUsually, Title } from '@anilibriaApi/types'
import { Flex } from '@components/Flex'
import { Select, SelectMenu } from '@components/Select'
import { anilibria } from '@anilibriaApi/anilibria'

type Quality = 'sd' | 'hd' | 'fhd'

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
	const [titlePlayer, setTitlePlayer] = useState<Title>(title)

	const [allSeries, setAllSeries] = useState<SelectMenu<SeriesUsually>[]>([])
	const [currentSeries, setCurrentSeries] = useState<SelectMenu<SeriesUsually>>(
		{
			id: 0,
			label: '1 серия',
			value: titlePlayer.player.playlist[0]
		}
	)

	const onChangeSeriesSelect = (series: SelectMenu<SeriesUsually>) => {
		return () => {
			setCurrentSeries(series)
		}
	}

	const [qualities, setQualities] =
		useState<SelectMenu<Quality>[]>(initialQualities)
	const [currentQuality, setCurrentQuality] = useState<SelectMenu<Quality>>(
		qualities[1]
	)
	const onChangeQualitySelect = (quality: SelectMenu<Quality>) => {
		return () => {
			setCurrentQuality(quality)
		}
	}

	useEffect(() => {
		const allSeriesForSelect: SelectMenu<SeriesUsually>[] = []

		for (const series of Object.entries(title.player.playlist)) {
			const idx = +series[0]
			allSeriesForSelect.push({
				id: idx,
				label: `${idx} серия`,
				value: series[1] as SeriesUsually
			})
		}

		setAllSeries(allSeriesForSelect)
		setCurrentSeries(allSeriesForSelect[0])
	}, [title.player.playlist])

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

	const host = title.player.host
	const videoUrl = `https://${host}${
		(currentSeries.value as SeriesUsually)?.hls[
			currentQuality.value as 'hd' | 'sd' | 'fhd'
		]
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
			<ReactPlayer url={videoUrl} width='100%' height='auto' controls />
		</Flex>
	)
}

export default Player
