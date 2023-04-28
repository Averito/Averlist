import { ChangeEventHandler, FC } from 'react'

import styles from './Checkbox.module.scss'
import { defineEmits } from '@helpers/defineEmits'
import { Flex } from '@components/Flex'
import { CheckboxProps } from './Checkbox.types'

export const Checkbox: FC<CheckboxProps> = ({
	id,
	onChange,
	checked,
	label
}) => {
	const emit = defineEmits<'change'>({
		change: onChange
	})

	const onChangeCheckbox: ChangeEventHandler<HTMLInputElement> = event => {
		emit('change', event.currentTarget.checked)
	}

	return (
		<Flex alignItems='center'>
			<input
				className={styles.checkbox}
				type='checkbox'
				id={id}
				onChange={onChangeCheckbox}
			/>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
		</Flex>
	)
}
