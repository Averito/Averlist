import { ChangeEventHandler, FC } from 'react'
import Image from 'next/image'

import styles from './Search.module.scss'
import searchIcon from '../../assets/icons/search.png'

interface SearchProps {
	value: string
	onChange: (newValue: string) => unknown
}

export const Search: FC<SearchProps> = ({ value, onChange }) => {
	const onChangeSearch: ChangeEventHandler<HTMLInputElement> = event => {
		onChange(event.currentTarget.value)
	}

	return (
		<div className={styles.container}>
			<div className={styles.inputBlock}>
				<input
					className={styles.input}
					name='search'
					value={value}
					onChange={onChangeSearch}
					placeholder='Поиск'
				/>
				<Image src={searchIcon} width={20} height={20} alt='Поиск' />
			</div>
		</div>
	)
}
