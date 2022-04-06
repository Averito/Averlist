import React, { useEffect } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import { useAppSelector } from 'hooks/useAppSelector'
import { forgotPasswordThunk } from 'store/reducers/landingReducer/landingThunks'

export const RestorePassword: React.FC = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const forgotPasswordComplete = useAppSelector(
		state => state.landing.forgotPasswordComplete
	)

	const onFinish = (values: any) => {
		const user = {
			login: values.name,
			email: values.email,
			password: values.password
		}
		dispatch(forgotPasswordThunk(user))
	}

	useEffect(() => {
		if (forgotPasswordComplete) navigate('/login')
	}, [forgotPasswordComplete, navigate])

	return (
		<Form
			name='basic'
			onFinish={onFinish}
			autoComplete='off'
			style={{ width: '100%' }}
		>
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
				name='password'
				rules={[
					{ required: true, message: 'Пожалуйста, введите свой пароль!' }
				]}
			>
				<Input.Password placeholder='Пароль' />
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
	)
}
