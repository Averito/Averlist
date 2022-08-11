import { FC, memo, MouseEventHandler } from 'react'
import classnames from 'classnames'

import styles from './Tag.module.scss'

interface TagProps {
	title: string
	checked: boolean
	onClick: MouseEventHandler<HTMLSpanElement>
}

export const Tag: FC<TagProps> = memo(({ title, checked, onClick }) => {
	const checkedClass = checked ? styles.checked : ''

	return (
		<span className={classnames(styles.tag, checkedClass)} onClick={onClick}>
			{title}
		</span>
	)
})
