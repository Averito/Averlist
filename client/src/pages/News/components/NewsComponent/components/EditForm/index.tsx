import { ChangeEventHandler, FC, useState } from 'react'
import { Button, Input, Typography } from 'antd'

import styles from './styles.module.scss'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { editNewsThunk } from 'store/reducers/newsReducer/newsThunks'
import { EditType, News } from 'api/myApi/news/types'

interface EditFormProps {
	news: News
	editable: boolean
	setEditable: () => unknown
}

export const EditForm: FC<EditFormProps> = ({
	news,
	editable,
	setEditable
}) => {
	const { isMobile } = useWindowSize()

	const dispatch = useAppDispatch()

	const [newDescription, setNewDescription] = useState<string>(news.description)

	const onChangeDescription: ChangeEventHandler<
		HTMLTextAreaElement
	> = event => {
		setNewDescription(event.currentTarget.value)
	}

	const onClickSaveDescription = () => {
		const savedDescription: EditType = {
			newsId: news._id as string,
			news: {
				picture: news.picture,
				description: newDescription,
				lastUpdate: Date.now()
			}
		}

		dispatch(editNewsThunk(savedDescription)).then(() => {
			setEditable()
		})
	}

	const onClickCloseEdit = () => {
		setEditable()
	}

	const maxLength = 1000
	const fontSize = isMobile ? '14px' : '16px'

	return editable ? (
		<div className={styles.textarea}>
			<Input.TextArea
				value={newDescription}
				onChange={onChangeDescription}
				maxLength={maxLength}
				showCount
			/>
			<div className={styles.textareaButton}>
				<Button type='primary' onClick={onClickSaveDescription}>
					Сохранить
				</Button>
				<Button type='primary' onClick={onClickCloseEdit} danger>
					Отмена
				</Button>
			</div>
		</div>
	) : (
		<Typography.Paragraph
			style={{ margin: '5px 0', whiteSpace: 'pre-wrap', fontSize }}
		>
			{news.description}
		</Typography.Paragraph>
	)
}
