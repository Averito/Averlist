import { observer } from 'mobx-react-lite'
import { FC, MouseEventHandler } from 'react'

import styles from './AnimeListFilters.module.scss'
import { Select, SelectMenu } from '@components/Select'
import { Autocomplete, AutocompleteMenu } from '@components/Autocomplete'
import { Checkbox } from '@components/Checkbox'
import { Averlist } from '@averlistApi/types'
import { statusFilterOptions } from '@pages/AnimeList/statusFilterOptions'
import { Flex } from '@components/Flex'
import { Button } from '@components/Button'

interface AnimeListFiltersProps {
	searchValue: string
	onChangeSearch: (value: string) => unknown
	selectOption: SelectMenu<Averlist.AnimeStatus | null>
	onChangeSelect: (
		option: SelectMenu<Averlist.AnimeStatus | null>
	) => MouseEventHandler<HTMLDivElement>
	showOnlyAnilibria: boolean
	onChangeShowOnlyAnilibria: (show: boolean) => unknown
	autocompleteMenus: AutocompleteMenu[]
	openCreateAnimeModal: MouseEventHandler<HTMLButtonElement>
}

export const AnimeListFilters: FC<AnimeListFiltersProps> = observer(
	({
		searchValue,
		onChangeSearch,
		onChangeSelect,
		selectOption,
		onChangeShowOnlyAnilibria,
		showOnlyAnilibria,
		autocompleteMenus,
		openCreateAnimeModal
	}) => {
		return (
			<div className={styles.wrapper}>
				<Checkbox
					id='showAnilibria'
					checked={showOnlyAnilibria}
					onChange={onChangeShowOnlyAnilibria}
					label='Показывать только аниме анилибрии'
				/>
				<Flex
					justifyContent='space-between'
					gap='15px'
					alignItems='center'
					flexWrap='wrap-reverse'
					margin='15px 0 0 0'
				>
					<Flex alignItems='center' flexWrap='wrap' gap='10px'>
						<Autocomplete
							value={searchValue}
							menuList={autocompleteMenus}
							onChange={onChangeSearch}
							placeholder='Поиск'
							name='animeNameSearch'
							width='min(100%, 200px)'
							margin='0 15px 0 0'
						/>
						<Select
							currentOption={selectOption}
							options={statusFilterOptions}
							onChange={onChangeSelect}
							width='150px'
						/>
					</Flex>
					<Button width='120px' onClick={openCreateAnimeModal}>
						Добавить
					</Button>
				</Flex>
			</div>
		)
	}
)
