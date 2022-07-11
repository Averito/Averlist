import { Series, SeriesUsually, Title } from '@anilibriaApi/types'

export const seriesToSeriesUsually = (
	titleList: Title[],
	limit = titleList.length
): SeriesUsually[] => {
	const seriesArr: SeriesUsually[] = []

	for (let idx = 0; idx < limit; idx++) {
		if (!titleList[idx]?.player?.playlist) continue

		Object.entries<SeriesUsually>(
			titleList[idx]?.player?.playlist as Series
		).forEach(series => {
			seriesArr.push(series[1])
		})
	}

	return seriesArr
}
