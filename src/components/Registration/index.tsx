import React, { useEffect } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import formAnimeGirl from 'assets/images/formAnimeGirl.png'
import { useAppSelector } from 'hooks/useAppSelector'
import { registrationThunk } from 'store/reducers/landingReducer/landingThunks'
import { DefaultLayout } from 'layouts/DefaultLayout'
import { useWindowSize } from 'hooks/useWindowSize'

export const Registration: React.FC = () => {
	const { height } = useWindowSize()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const registrationComplete = useAppSelector(
		state => state.landing.registrationComplete
	)

	const onFinish = (values: any) => {
		const user = {
			login: values.name,
			email: values.email,
			password: values.password
		}
		dispatch(registrationThunk(user))
	}

	useEffect(() => {
		if (registrationComplete) navigate('/login')
	}, [registrationComplete, navigate])

	return (
		<DefaultLayout>
			<Form
				className={styles.form}
				name='basic'
				onFinish={onFinish}
				autoComplete='off'
				style={{ width: '100%' }}
			>
				{height > 575 && (
					<img className={styles.formGirl} src={formAnimeGirl} alt='' />
				)}
				<Typography.Title level={4} style={{ color: 'white' }}>
					Регистрация
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
				<div className={styles.loginOrRestorePassword}>
					<Link to='/restore-password'>Забыли пароль?</Link>
					<Link to='/login'>Логин</Link>
				</div>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Зарегестрироваться
					</Button>
				</Form.Item>
			</Form>
		</DefaultLayout>
	)
}
