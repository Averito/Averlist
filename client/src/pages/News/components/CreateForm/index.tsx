import { FC, useState, ChangeEventHandler } from 'react'
import { Form, Typography, Upload, Button, Input } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'
import { getBase64 } from 'helpers/getBase64'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { createNewsThunk } from 'store/reducers/newsReducer/newsThunks'

const { Dragger } = Upload

export const CreateForm: FC = () => {
	const maxLength = 1000

	const dispatch = useAppDispatch()

	const [picture, setPicture] = useState<File | null>(null)
	const [pictureView, setPictureView] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const onChangeDragger = async (event: any) => {
		const [newPicture] = event.fileList
		setPicture(event.file.originFileObj)
		setPictureView(await getBase64(newPicture.originFileObj))
	}

	const onClickDeletePicture = () => {
		setPicture(null)
		setPictureView('')
	}

	const onChangeDescription: ChangeEventHandler<
		HTMLTextAreaElement
	> = newDescription => {
		setDescription(newDescription.currentTarget.value)
	}

	const onFinishForm = () => {
		const formData = new FormData()
		formData.set('picture', picture ?? '')
		formData.set('description', description)
		formData.set('lastUpdate', Date.now().toString())
		dispatch(createNewsThunk(formData)).then(() => {
			setPicture(null)
			setPictureView('')
			setDescription('')
		})
	}

	return (
		<div className={styles.wrapper}>
			<Form onFinish={onFinishForm} style={{ width: '500px' }}>
				<Form.Item>
					{pictureView ? (
						<>
							<img
								className={styles.picture}
								src={pictureView}
								alt='Не загрузилось...'
							/>
							<Button
								type='primary'
								onClick={onClickDeletePicture}
								style={{ margin: '5px 0 0 0' }}
								danger
							>
								Удалить
							</Button>
						</>
					) : (
						<Dragger
							style={{ padding: '0 8px' }}
							fileList={[]}
							onChange={onChangeDragger}
						>
							<p className={styles.icon}>
								<InboxOutlined />
							</p>
							<Typography.Paragraph>
								Перетащите или кликните чтобы загрузить картинку
							</Typography.Paragraph>
						</Dragger>
					)}
				</Form.Item>
				<Form.Item>
					<Input.TextArea
						onChange={onChangeDescription}
						placeholder='Описание'
						maxLength={maxLength}
						value={description}
						showCount
					/>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Создать
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
