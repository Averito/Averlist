import { FC, memo } from 'react'
import classnames from 'classnames'

import styles from './Tag.module.scss'
import { TagProps } from './Tag.types'

export const Tag: FC<TagProps> = memo(({ title, checked, onClick }) => {
	const checkedClass = checked ? styles.checked : ''

	return (
		<span className={classnames(styles.tag, checkedClass)} onClick={onClick}>
			{title}
		</span>
	)
})
