import { ChangeEventHandler, FC, memo } from 'react'

import styles from './Input.module.scss'

export type InputType = 'text' | 'number' | 'password' | 'email'

interface InputProps {
	type?: InputType
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	placeholder?: string
	name?: string
	width?: string
	label?: string
}

export const Input: FC<InputProps> = memo(
	({ value, onChange, placeholder, name, width, label, type }) => {
		const widthStyle = { width: width ?? '240px' }

		return (
			<div>
				{label && <p className={styles.label}>{label}</p>}
				<input
					type={type}
					className={styles.input}
					style={widthStyle}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete='off'
				/>
			</div>
		)
	}
)
