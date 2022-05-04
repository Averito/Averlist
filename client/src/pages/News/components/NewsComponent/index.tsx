import { FC } from 'react'
import { Button, Typography } from 'antd'
import moment from 'moment'

import styles from './styles.module.scss'
import { News } from 'api/myApi/news/types'
import { MY_PICTURE_URI } from 'variebles'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useToggle } from 'hooks/useToggle'
import { removeNewsThunk } from 'store/reducers/newsReducer/newsThunks'
import { EditForm } from './components/EditForm'

interface NewsComponentProps {
	news: News
}

export const NewsComponent: FC<NewsComponentProps> = ({ news }) => {
	const dispatch = useAppDispatch()

	const currentRole = useAppSelector(state => state.user.role)

	const { value: edit, setValue: toggleEdit } = useToggle()

	const admin = currentRole === 'admin'
	const picture = news.picture ? MY_PICTURE_URI + news.picture : ''

	const onClickRemoveNews = () => {
		dispatch(removeNewsThunk(news._id as string))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.time}>
				<Typography.Paragraph style={{ margin: 0 }}>
					<span style={{ opacity: 0.5 }}>Последнее обновление: </span>
					{moment(news.lastUpdate).format('DD/MM/YYYY | HH:mm')}
				</Typography.Paragraph>
			</div>
			<img className={styles.picture} src={picture} alt='' />
			<EditForm news={news} editable={edit} setEditable={toggleEdit} />
			{admin && !edit && (
				<div className={styles.buttons}>
					<Button type='primary' onClick={toggleEdit}>
						Редактировать
					</Button>
					<Button type='primary' onClick={onClickRemoveNews} danger>
						Удалить
					</Button>
				</div>
			)}
		</div>
	)
}
