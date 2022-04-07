import React, { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'

export const AnilibriaLoader: FC = () => {
	return (
		<div className={styles.anilibriaLoader}>
			<LoadingOutlined />
			<p className={styles.anilibriaLoaderTitle}>Подключение к anilibria...</p>
		</div>
	)
}
