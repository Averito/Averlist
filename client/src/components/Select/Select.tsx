import { FC, MouseEventHandler, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import classNames from 'classnames'

import styles from './Select.module.scss'
import { Flex } from '@components/Flex'
import { useOutside } from '@hooks/useOutside'
import { SelectProps } from './Select.types'

export const Select: FC<SelectProps> = ({
	options,
	currentOption,
	label,
	placeholder = 'Выберите из списка',
	width = 'fit-content',
	onChange,
	margin = '0'
}) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)

	const open: MouseEventHandler<HTMLDivElement> = () => {
		if (isOpened) return setIsOpened(false)
		setIsOpened(true)
	}
	const select = useRef<HTMLDivElement>(null)
	useOutside(select, () => {
		setIsOpened(false)
	})

	const widthStyle = { width }
	const marginStyle = { margin }

	const optionsOpenedClassName = isOpened && styles.optionsOpened
	const iconActiveClassName = isOpened && styles.iconActive

	return (
		<div className={styles.select} style={widthStyle}>
			<div style={marginStyle}>
				{label && <p className={styles.label}>{label}</p>}
				<Flex
					className={styles.mainLabel}
					onClick={open}
					ref={select}
					justifyContent='space-between'
					alignItems='center'
					padding='7px 10px'
				>
					{currentOption.label || placeholder}
					<IoIosArrowDown
						size={16}
						className={classNames(styles.icon, iconActiveClassName)}
					/>
				</Flex>
			</div>
			<div className={styles.optionsContainer}>
				<div className={classNames(styles.options, optionsOpenedClassName)}>
					{options.map(option => (
						<p
							className={styles.option}
							key={option.id}
							onClick={onChange(option)}
						>
							{option.label}
						</p>
					))}
				</div>
			</div>
		</div>
	)
}
