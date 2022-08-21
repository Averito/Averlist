import { ChangeEventHandler, FC, memo } from 'react'

import styles from './Input.module.scss'

interface InputProps {
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	placeholder: string
	name: string
	width?: string
}

export const Input: FC<InputProps> = memo(
	({ value, onChange, placeholder, name, width }) => {
		const widthStyle = { width: width ?? '240px' }

		return (
			<input
				className={styles.input}
				style={widthStyle}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		)
	}
)
