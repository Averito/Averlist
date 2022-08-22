import { FC } from 'react'

import styles from './StatusYearType.module.scss'

interface StatusYearTypeProps {
	status: string
	year: number | string
	type: string
}

export const StatusYearType: FC<StatusYearTypeProps> = ({
	status,
	year,
	type
}) => {
	return (
		<div className={styles.tags}>
			<span className={styles.status}>{status}</span>
			<span className={styles.dot}>•</span>
			<span className={styles.year}>{year}</span>
			<span className={styles.dot}>•</span>
			<span className={styles.type}>{type}</span>
		</div>
	)
}
