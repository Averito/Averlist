import { FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import styles from './ResetPassword.module.scss'
import { AuthLayout } from '@layouts/AuthLayout'
import { useInput } from '@hooks/useInput'
import { averlist } from '@averlistApi/averlist'
import { Input } from '@components/Input'
import { Meta } from '@utils/Meta'
import { errorToast, successToast } from '@helpers/toasts'

export const ResetPassword: NextPage = () => {
	const router = useRouter()

	const [email, setEmail] = useInput()

	const onSubmit: FormEventHandler = async event => {
		event.preventDefault()

		try {
			await averlist.auth.resetPassword({ email })
			successToast('Новый пароль отправлен вам на почту')
			await router.push('/login')
		} catch {
			errorToast('Аккаунта с такой электронной почтой не существует')
		}
	}

	return (
		<>
			<Meta
				title='Averlist | Сброс пароля'
				description='Сброс пароля для забавчивых'
			/>
			<AuthLayout
				title='Сброс пароля'
				buttonText='Сбросить'
				onSubmit={onSubmit}
				services={false}
			>
				<Input
					value={email}
					onChange={setEmail}
					label='Почта'
					placeholder='example@gmail.com'
					type='email'
					width='100%'
				/>
				<div className={styles.margin} />
			</AuthLayout>
		</>
	)
}
