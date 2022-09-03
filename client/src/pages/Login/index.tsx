import { NextPage } from 'next'

import styles from './Login.module.scss'
import { Input } from '@components/Input'
import { Meta } from '@utils/Meta'
import { Button } from '@components/Button'
import { useInput } from '@hooks/useInput'
import { FormEventHandler } from 'react'

export const Login: NextPage = () => {
	const { value: email, setValue: setEmail } = useInput()
	const { value: password, setValue: setPassword } = useInput()

	const onSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		console.log('submit')
	}

	return (
		<>
			<Meta title='Averlist | Вход' description='Логин Averlist' />
			<div className={styles.container}>
				<div className={styles.form}>
					<h1 className={styles.title}>Логин</h1>
					<form onSubmit={onSubmit}>
						<div className={styles.block}></div>
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
						<div className={styles.submitButtonWrapper}>
							<Button className={styles.submitButton}>Войти</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
