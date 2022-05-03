import { FC, useEffect } from 'react'
import { Button } from 'antd'

import styles from './styles.module.scss'
import { CreateForm } from './components/CreateForm'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { NewsComponent } from './components/NewsComponent'
import { Loader } from 'components/Loader'
import { getNewsThunk } from 'store/reducers/newsReducer/newsThunks'

export const News: FC = () => {
	const dispatch = useAppDispatch()

	const news = useAppSelector(state => state.news.news)
	const loading = useAppSelector(state => state.news.loading)
	const currentRole = useAppSelector(state => state.user.role)

	const onClickReload = () => {
		dispatch(getNewsThunk())
	}

	useEffect(() => {
		dispatch(getNewsThunk())
	}, [dispatch])

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{currentRole === 'admin' && <CreateForm />}
				<div className={styles.reloadButton}>
					<Button type='primary' onClick={onClickReload}>
						Обновить ленту
					</Button>
				</div>
				{loading ? (
					<Loader />
				) : (
					<div className={styles.news}>
						{news.map(newsEl => (
							<NewsComponent key={newsEl._id} news={newsEl} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
