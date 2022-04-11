import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'

import { OldAndNewPassword } from 'types'
import { forgotPasswordThunk } from 'store/reducers/userReducer/userThunks'
import { errorToast } from 'helpers/toast'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'

export const Security: FC = () => {
	const dispatch = useAppDispatch()

	const { login, email } = useAppSelector(state => state.user)

	const onFinishForm = (formObj: OldAndNewPassword) => {
		const { newPassword, oldPassword, successPassword } = formObj

		if (newPassword !== successPassword) {
			return errorToast('Новый пароль и пароль для подтверждения не совпадают')
		}
		const objForNewPassword = {
			login,
			email,
			password: newPassword,
			oldPassword
		}
		dispatch(forgotPasswordThunk(objForNewPassword))
	}

	return (
		<Form layout='vertical' onFinish={onFinishForm}>
			<Form.Item label='Текущий пароль' name='oldPassword'>
				<Input name='oldPassword' placeholder='Текущий пароль' />
			</Form.Item>
			<Form.Item label='Новый пароль' name='newPassword'>
				<Input name='newPassword' placeholder='Новый пароль' />
			</Form.Item>
			<Form.Item label='Подтверждение пароля' name='successPassword'>
				<Input name='successPassword' placeholder='Подтверждение пароля' />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Сохранить
				</Button>
			</Form.Item>
		</Form>
	)
}
