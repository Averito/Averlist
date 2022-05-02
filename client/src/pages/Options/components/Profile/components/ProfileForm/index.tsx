import React, { FC, useState } from 'react'
import { Form, Input, Button } from 'antd'

import styles from './styles.module.scss'
import { editUserThunk } from 'store/reducers/userReducer/userThunks'
import { useAppSelector } from 'hooks/useAppSelector'
import { LoginAndDescription } from 'types'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const ProfileForm: FC = () => {
	const maxLength = 1000

	const dispatch = useAppDispatch()
	const { login, description } = useAppSelector(state => state.user)

	const [viewForm, setViewForm] = useState<boolean>(false)

	const onClickViewForm = () => {
		setViewForm(true)
	}
	const onClickCancel = () => {
		setViewForm(false)
	}

	const onFinishForm = (formResult: LoginAndDescription) => {
		dispatch(editUserThunk(formResult))
		setViewForm(false)
	}

	return (
		<>
			{!viewForm ? (
				<div>
					<div className={styles.login}>
						<p className={styles.title}>Логин:</p>
						<p className={styles.loginText}>{login}</p>
					</div>
					<div className={styles.description}>
						<p className={styles.title}>О себе:</p>
						<p className={styles.descriptionText}>
							{description || 'Не заполнено'}
						</p>
					</div>
					<Button type='primary' onClick={onClickViewForm}>
						Редактировать
					</Button>
				</div>
			) : (
				<Form layout='vertical' onFinish={onFinishForm}>
					<Form.Item label='Логин' name='login'>
						<Input name='login' placeholder={login} />
					</Form.Item>
					<Form.Item label='Описание' name='description'>
						<Input.TextArea
							name='description'
							placeholder='Описание'
							maxLength={maxLength}
							showCount
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Сохранить
						</Button>
						<Button style={{ margin: '0 0 0 20px' }} onClick={onClickCancel}>
							Отмена
						</Button>
					</Form.Item>
				</Form>
			)}
		</>
	)
}
