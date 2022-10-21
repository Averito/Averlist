import { observer } from 'mobx-react-lite'
import { FC, MouseEventHandler } from 'react'

import styles from './AnimeListFilters.module.scss'
import { Select, SelectMenu } from '@components/Select'
import { Autocomplete, AutocompleteMenu } from '@components/Autocomplete'
import { Checkbox } from '@components/Checkbox'
import { Averlist } from '@averlistApi/types'
import { statusFilterOptions } from '@pages/AnimeList/statusFilterOptions'
import animeListStore from '@stores/animeList.store'

interface AnimeListFiltersProps {
	searchValue: string
	onChangeSearch: (value: string) => unknown
	selectOption: SelectMenu<Averlist.AnimeStatus | null>
	onChangeSelect: (
		option: SelectMenu<Averlist.AnimeStatus | null>
	) => MouseEventHandler<HTMLDivElement>
	showOnlyAnilibria: boolean
	onChangeShowOnlyAnilibria: (show: boolean) => unknown
}

export const AnimeListFilters: FC<AnimeListFiltersProps> = observer(
	({
		searchValue,
		onChangeSearch,
		onChangeSelect,
		selectOption,
		onChangeShowOnlyAnilibria,
		showOnlyAnilibria
	}) => {
		const autocompleteMenus: AutocompleteMenu[] = animeListStore.animeList
			.filter(anime => (showOnlyAnilibria ? !!anime?.anilibriaId : true))
			.filter(anime => anime.name.includes(searchValue))
			.filter(anime =>
				selectOption.value ? anime.status === selectOption.value : true
			)

		return (
			<div className={styles.wrapper}>
				<div className={styles.block}>
					<Checkbox
						id='showAnilibria'
						checked={showOnlyAnilibria}
						onChange={onChangeShowOnlyAnilibria}
						label='Показывать только аниме анилибрии'
					/>
				</div>
				<div className={styles.block}>
					<Select
						currentOption={selectOption}
						options={statusFilterOptions}
						onChange={onChangeSelect}
						width='100%'
					/>
				</div>
				<Autocomplete
					value={searchValue}
					menuList={autocompleteMenus}
					onChange={onChangeSearch}
					placeholder='Поиск'
					name='animeNameSearch'
					width='100%'
				/>
			</div>
		)
	}
)
