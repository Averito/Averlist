import { forwardRef } from 'react'
import cs from 'classnames'

import styles from './Input.module.scss'
import { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			value,
			onChange,
			onKeyDown,
			placeholder,
			className,
			name,
			width,
			label,
			type,
			margin
		},
		ref
	) => {
		const widthStyle = { width: width ?? '240px' }
		const marginStyle = { margin }

		return (
			<div style={marginStyle}>
				{label && <p className={styles.label}>{label}</p>}
				<input
					ref={ref}
					type={type}
					className={cs(styles.input, className)}
					style={widthStyle}
					name={name}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					autoComplete='off'
				/>
			</div>
		)
	}
)
