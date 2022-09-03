import { FormEventHandler } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import styles from './Registration.module.scss'
import { Input } from '@components/Input'
import { Meta } from '@utils/Meta'
import { Button } from '@components/Button'
import { useInput } from '@hooks/useInput'
import { averlist } from '@averlistApi/averlist'

export const Registration: NextPage = () => {
	const router = useRouter()

	const { value: login, setValue: setLogin } = useInput()
	const { value: name, setValue: setName } = useInput()
	const { value: email, setValue: setEmail } = useInput()
	const { value: password, setValue: setPassword } = useInput()
	const { value: passwordAgain, setValue: setPasswordAgain } = useInput()

	const onSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		if (!login || !name || !email)
			return toast.error('Все поля не должны быть пустыми')
		if (password !== passwordAgain) return toast.error('Пароли не совпадают')
		if (!email.includes('@'))
			return toast.error('Электронная почта введена не в верном формате')

		averlist.auth.registration({
			login,
			email,
			name,
			password
		})

		toast.success('Регистрация прошла успешно')
		router.push('/lk')
	}

	return (
		<>
			<Meta title='Averlist | Регистрация' description='Регистрация Averlist' />
			<div className={styles.container}>
				<div className={styles.form}>
					<h1 className={styles.title}>Регистрация</h1>
					<form onSubmit={onSubmit}>
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
						<div className={styles.submitButtonWrapper}>
							<Button className={styles.submitButton}>
								Зарегистрироваться
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
