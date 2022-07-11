import { Series, SeriesUsually, Title } from '@anilibriaApi/types'

export const firstSeriesToSeriesUsually = (
	titleList: Title[],
	limit = titleList.length
): Title[] => {
	const seriesArr: SeriesUsually[] = []
	const titleListCopy = JSON.parse(JSON.stringify(titleList)) as Title[]

	for (let idx = 0; idx < limit; idx++) {
		if (!titleList[idx].player.playlist) continue

		const oneSeries = Object.entries<SeriesUsually>(
			titleList[idx].player.playlist as Series
		)
		const oneSeriesMap = new Map(oneSeries)
		const firstSeries = oneSeriesMap.get('1')

		if (firstSeries) {
			titleListCopy[idx].player.playlist = [firstSeries as SeriesUsually]
		}
	}

	return titleListCopy
}
