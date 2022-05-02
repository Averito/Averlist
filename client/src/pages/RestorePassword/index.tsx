import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import formAnimeGirl from 'assets/images/formAnimeGirl.png'
import { forgotPasswordThunk } from 'store/reducers/landingReducer/landingThunks'
import { DefaultLayout } from 'layouts/DefaultLayout'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const RestorePassword: React.FC = () => {
	const { height } = useWindowSize()

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onFinish = (values: any) => {
		const user = {
			login: values.name,
			email: values.email,
			password: values.password,
			oldPassword: values.oldPassword
		}
		dispatch(forgotPasswordThunk(user)).then(response => {
			if (response.payload) {
				navigate('/login')
			}
		})
	}

	return (
		<DefaultLayout>
			<Form
				className={styles.form}
				name='basic'
				onFinish={onFinish}
				autoComplete='off'
				style={{ width: '100%' }}
			>
				{height > 620 && (
					<img className={styles.formGirl} src={formAnimeGirl} alt='' />
				)}
				<Typography.Title level={4} style={{ color: 'white' }}>
					Восстановление пароля
				</Typography.Title>
				<Form.Item
					name='name'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свой ник!'
						}
					]}
					style={{ margin: '0 0 10px 0' }}
				>
					<Input placeholder='Никнейм' />
				</Form.Item>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свою электронную почту!'
						}
					]}
					style={{ margin: '0 0 10px 0' }}
				>
					<Input type='email' placeholder='Электронная почта' />
				</Form.Item>
				<Form.Item
					name='oldPassword'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свой текущий пароль!'
						}
					]}
					style={{ margin: '0 0 10px 0' }}
				>
					<Input.Password placeholder='Текущий пароль' />
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свой новый пароль!'
						}
					]}
				>
					<Input.Password placeholder='Новый пароль' />
				</Form.Item>
				<div className={styles.loginOrRegistration}>
					<Link to='/registration'>Регистрация</Link>
					<Link to='/login'>Логин</Link>
				</div>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Восстановить
					</Button>
				</Form.Item>
			</Form>
		</DefaultLayout>
	)
}
