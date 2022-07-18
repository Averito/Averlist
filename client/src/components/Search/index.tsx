import { ChangeEventHandler, FC } from 'react'

import styles from './Search.module.scss'

interface SearchProps {
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	placeholder: string
}

export const Search: FC<SearchProps> = ({ value, onChange, placeholder }) => {
	return (
		<input
			className={styles.input}
			name='search'
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	)
}
