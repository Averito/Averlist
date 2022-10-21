import { FormEventHandler } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import styles from './Registration.module.scss'
import { Input } from '@components/Input'
import { Meta } from '@components/Meta'
import { useInput } from '@hooks/useInput'
import { averlist } from '@averlistApi/averlist'
import { AuthLayout } from '@layouts/AuthLayout'
import { errorToast, successToast } from '@helpers/toasts'

export const Registration: NextPage = () => {
	const router = useRouter()

	const [login, setLogin] = useInput()
	const [name, setName] = useInput()
	const [email, setEmail] = useInput()
	const [password, setPassword] = useInput()
	const [passwordAgain, setPasswordAgain] = useInput()

	const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		if (!login || !name || !email)
			return errorToast('Поля не должны быть пустыми')
		if (password !== passwordAgain) return toast.error('Пароли не совпадают')
		if (!email.includes('@'))
			return errorToast('Электронная почта введена не в верном формате')

		await averlist.auth.registration({
			login,
			name,
			email,
			password
		})

		successToast('Регистрация прошла успешно, проверьте свою почту')
		await router.push('/lk')
	}

	const additionalText = (
		<div className={styles.additionalText}>
			<p>У вас уже есть аккаунт?</p>
			<Link href='/login'>Войти</Link>
		</div>
	)

	return (
		<>
			<Meta title='Averlist | Регистрация' description='Регистрация Averlist' />
			<AuthLayout
				title='Регистрация'
				buttonText='Зарегистрироваться'
				onSubmit={onSubmit}
				additionalText={additionalText}
			>
				<div className={styles.block}>
					<Input
						value={login}
						onChange={setLogin}
						placeholder='Логин'
						width='100%'
						label='Логин'
					/>
				</div>
				<div className={styles.block}>
					<Input
						value={name}
						onChange={setName}
						placeholder='Никнейм'
						width='100%'
						label='Никнейм'
					/>
				</div>
				<div className={styles.block}>
					<Input
						type='email'
						value={email}
						onChange={setEmail}
						placeholder='example@gmail.com'
						width='100%'
						label='Почта'
					/>
				</div>
				<div className={styles.block}>
					<Input
						type='password'
						value={password}
						onChange={setPassword}
						placeholder='Пароль'
						width='100%'
						label='Пароль'
					/>
				</div>
				<div className={styles.block}>
					<Input
						type='password'
						value={passwordAgain}
						onChange={setPasswordAgain}
						placeholder='Пароль'
						width='100%'
						label='Повторите пароль'
					/>
				</div>
			</AuthLayout>
		</>
	)
}
