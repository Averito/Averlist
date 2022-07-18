import { NextPage } from 'next'
import dayjs from 'dayjs'

import styles from './Anime.module.scss'
import { Meta } from '@utils/Meta'
import { Title } from '@anilibriaApi/types'
import { AnimeCard } from '@components/AnimeCard'
import { Search } from '@components/Search'
import { useInput } from '@hooks/useInput'

interface AnimeProps {
	years: number[]
	genres: string[]
	titleList: Title[]
}

export const Anime: NextPage<AnimeProps> = ({ years, genres, titleList }) => {
	const { value: searchValue, setValue: setSearchValue } = useInput()

	return (
		<>
			<Meta
				title='Averlist | Аниме каталог'
				description='Выбери что по нраву, мой юный господин...'
			/>
			<section className={styles.wrapper}>
				<h1 className={styles.title}>Новинки {dayjs().year()} года</h1>
				<div className={styles.tags}>Тут будут различные теги</div>
				<div className={styles.searchBlock}>
					<Search
						value={searchValue}
						onChange={setSearchValue}
						placeholder='Поиск'
					/>
				</div>
				<div className={styles.recommendations}>
					{titleList
						.filter(title => title.names.ru.includes(searchValue))
						.map(title => (
							<AnimeCard title={title} key={title.id} />
						))}
				</div>
			</section>
		</>
	)
}
