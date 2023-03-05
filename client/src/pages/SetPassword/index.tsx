import { FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import { AuthLayout } from '@layouts/AuthLayout'
import { Input } from '@components/Input'
import { useInput } from '@hooks/useInput'
import { Averlist } from '@averlistApi/types'
import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'
import { successToast } from '@helpers/toasts'
import { Meta } from '@components/Meta'

export const SetPassword: NextPage = () => {
	const router = useRouter()

	const [password, setPassword] = useInput()

	const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		const { name, email, avatar } = router.query

		try {
			const registrationBody: Averlist.Registration = {
				name: name as string,
				login: name as string,
				avatar: avatar as string,
				email: email as string,
				emailActive: true,
				password
			}

			await userStore.registration(registrationBody, false)
			await router.push('/lk')

		} catch {
			const loginBody: Averlist.Login = {
				email: email as string,
				password
			}

			await userStore.login(loginBody)
			await router.push('/lk')
		}
	}

	return (
		<>
			<Meta
				title='Averlist | Установка пароля'
				description='Установка пароля'
			/>
			<AuthLayout
				buttonText='Войти'
				onSubmit={onSubmit}
				services={false}
				title='Вход'
			>
				<Input
					margin='0 0 15px 0'
					width='100%'
					type='password'
					label='Пароль'
					value={password}
					onChange={setPassword}
					placeholder='Ваш замечательный пароль'
				/>
			</AuthLayout>
		</>
	)
}
