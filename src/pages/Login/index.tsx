import React, { FC, useEffect } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import formAnimeGirl from 'assets/images/formAnimeGirl.png'
import { loginThunk } from 'store/reducers/landingReducer/landingThunks'
import { DefaultLayout } from 'layouts/DefaultLayout'
import { useAppSelector } from 'hooks/useAppSelector'
import { useWindowSize } from 'hooks/useWindowSize'
import { useAppDispatch } from 'hooks/useAppDispatch'

export const Login: FC = () => {
	const { height } = useWindowSize()

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const isAuth = useAppSelector(state => state.landing.isAuth)

	const onFinish = (values: any) => {
		dispatch(loginThunk(values))
	}

	useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [navigate, isAuth])

	return (
		<DefaultLayout>
			<Form
				className={styles.form}
				name='basic'
				onFinish={onFinish}
				autoComplete='off'
				style={{ width: '100%' }}
			>
				{height > 530 && (
					<img className={styles.formGirl} src={formAnimeGirl} alt='' />
				)}
				<Typography.Title
					className='whiteColor'
					level={4}
					style={{ color: 'white' }}
				>
					Вход
				</Typography.Title>
				<Form.Item name='email' style={{ margin: '0 0 10px 0' }}>
					<Input type='email' placeholder='Электронная почта' />
				</Form.Item>
				<Form.Item name='password'>
					<Input.Password placeholder='Пароль' />
				</Form.Item>
				<div className={styles.registrationOrRestorePassword}>
					<Link to='/registration'>Регистрация</Link>
					{/* <Link to='/restore-password'>Забыли пароль?</Link> */}
				</div>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</DefaultLayout>
	)
}
