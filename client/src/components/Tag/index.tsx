import { FC } from 'react'

import styles from './Tag.module.scss'
import { Title } from '@anilibriaApi/types'

interface TagProps {
	type: 'string' | 'series' | 'length' | 'status'
	title: Title
}

export const Tag: FC<TagProps> = ({ title, type }) => {
	if (type === 'length' && title.type.length) {
		return <span className={styles.tag}>{title.type.length} минут</span>
	}

	if (type === 'series' && title.type.series) {
		return <span className={styles.tag}>{title.type.series} серий</span>
	}

	if (type === 'string' && title.type.string) {
		return <span className={styles.tag}>{title.type.string}</span>
	}

	if (type === 'status' && title.status.string) {
		return <span className={styles.redTag}>{title.status.string}</span>
	}

	return <template />
}
