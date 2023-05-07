import { FC, memo } from 'react'

import styles from './Input.module.scss'
import { InputProps } from './Input.types'

export const Input: FC<InputProps> = memo(
	({ value, onChange, placeholder, name, width, label, type, margin }) => {
		const widthStyle = { width: width ?? '240px' }
		const marginStyle = { margin }

		return (
			<div style={marginStyle}>
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
