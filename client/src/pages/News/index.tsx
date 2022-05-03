import { FC } from 'react'

import styles from './styles.module.scss'
import { CreateForm } from './components/CreateForm'
import { useAppSelector } from 'hooks/useAppSelector'

export const News: FC = () => {
	const currentRole = useAppSelector(state => state.user.role)

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{currentRole === 'admin' && <CreateForm />}
			</div>
		</div>
	)
}
