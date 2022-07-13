import { Schelude, Title } from '@anilibriaApi/types'
import { useEffect, useState } from 'react'
import { reverseArray } from '@helpers/reverseArray'
import { QueryObject } from '@helpers/generateQueryParamsString'
import { anilibria } from '@anilibriaApi/anilibria'
import { firstSeriesToSeriesUsually } from '@helpers/firstSeriesToSeriesUsually'

export const usePropsOnClient = (
	updatesTitleList: Title[],
	changesTitleList: Title[],
	firstFiveTitles: Title[],
	scheludeOfWeek: Schelude[]
) => {
	const [reversedUpdatesTitleList, setReversedUpdatesTitleList] = useState<
		Title[]
	>(reverseArray(updatesTitleList))
	const [newChangesTitleList, setNewChangesTitleList] =
		useState<Title[]>(changesTitleList)
	const [newFirstFiveTitles, setNewFirstFiveTitles] =
		useState<Title[]>(firstFiveTitles)
	const [newScheludeOfWeek, setNewScheludeOfWeek] =
		useState<Schelude[]>(scheludeOfWeek)

	useEffect(() => {
		const asyncWrapper = async () => {
			const objectParams: QueryObject = {
				filter: [
					'id',
					'names',
					'description',
					'posters',
					'status',
					'type',
					'code'
				],
				limit: 30
			}
			const objectParamsForSlider: QueryObject = {
				filter: [
					'id',
					'names',
					'description',
					'player',
					'status',
					'type',
					'code'
				],
				limit: 5
			}
			const objectParamsForSchelude: QueryObject = {
				filter: [
					'id',
					'names',
					'description',
					'posters',
					'status',
					'type',
					'code'
				]
			}
			const days = [0, 1, 2, 3, 4, 5, 6]

			const updatesTitleList = await anilibria.getUpdates(objectParams)
			const changesTitleList = await anilibria.getChanges(objectParams)
			const scheludeOfWeek = await anilibria.getSchelude(
				objectParamsForSchelude,
				days
			)
			let firstFiveTitles = await anilibria.getChanges(objectParamsForSlider)
			firstFiveTitles = firstSeriesToSeriesUsually(firstFiveTitles, 5)

			setReversedUpdatesTitleList(reverseArray(updatesTitleList))
			setNewChangesTitleList(changesTitleList)
			setNewFirstFiveTitles(firstFiveTitles)
			setNewScheludeOfWeek(scheludeOfWeek)
		}
		asyncWrapper()
	}, [])

	return {
		reversedUpdatesTitleList,
		newChangesTitleList,
		newFirstFiveTitles,
		newScheludeOfWeek
	}
}
