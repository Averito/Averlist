import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import formAnimeGirl from 'assets/images/formAnimeGirl.png'
import { registrationThunk } from 'store/reducers/landingReducer/landingThunks'
import { DefaultLayout } from 'layouts/DefaultLayout'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const Registration: React.FC = () => {
	const { height } = useWindowSize()

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onFinish = (values: any) => {
		const user = {
			login: values.name,
			email: values.email,
			password: values.password,
			description: '',
			avatar: '',
			friendList: []
		}
		dispatch(registrationThunk(user)).then(response => {
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
				{height > 575 && (
					<img className={styles.formGirl} src={formAnimeGirl} alt='' />
				)}
				<Typography.Title
					className='whiteColor'
					level={4}
					style={{ color: 'white' }}
				>
					Регистрация
				</Typography.Title>
				<Form.Item name='name' style={{ margin: '0 0 10px 0' }}>
					<Input placeholder='Никнейм' />
				</Form.Item>
				<Form.Item name='email' style={{ margin: '0 0 10px 0' }}>
					<Input type='email' placeholder='Электронная почта' />
				</Form.Item>
				<Form.Item name='password'>
					<Input.Password placeholder='Пароль' />
				</Form.Item>
				<div className={styles.loginOrRestorePassword}>
					{/* <Link to='/restore-password'>Забыли пароль?</Link> */}
					<Link to='/login'>Логин</Link>
				</div>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</DefaultLayout>
	)
}
