import { MouseEventHandler } from 'react'
import { NextPage } from 'next'
import { FaGoogle } from 'react-icons/fa'
import { FaYandex } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { SlSocialVkontakte } from 'react-icons/sl'

import styles from './Login.module.scss'
import saoAuthLayout from '@assets/images/saoAuthLayout.webp'
import { Meta } from '@components'
import { useRouter } from 'next/router'

export const Login: NextPage = () => {
	const router = useRouter()

	// const signInGoogle: MouseEventHandler<HTMLDivElement> = () => {
	// 	void router.push('/api/v1/auth/google')
	// }

	const signInYandex: MouseEventHandler<HTMLDivElement> = () => {
		void router.push('/api/v1/auth/yandex')
	}

	const signInDiscord: MouseEventHandler<HTMLDivElement> = () => {
		void router.push('/api/v1/auth/discord')
	}
	const signInVK: MouseEventHandler<HTMLDivElement> = () => {
		void router.push('/api/v1/auth/vk')
	}

	const containerBackground = {
		background: `url("${saoAuthLayout.src}") no-repeat 50% 105%/320px 320px`
	}

	return (
		<>
			<Meta title='Averlist | Вход' description='Логин Averlist' />
			<div className={styles.container} style={containerBackground}>
				<div className={styles.form}>
					<div className={styles.servicesButtons}>
						{/*<div className={styles.button} onClick={signInGoogle}>*/}
						{/*	<FaGoogle size={30} color='white' />*/}
						{/*</div>*/}
						<div className={styles.button} onClick={signInYandex}>
							<FaYandex size={30} color='white' />
						</div>
						<div className={styles.button} onClick={signInDiscord}>
							<FaDiscord size={30} color='white' />
						</div>
						<div className={styles.button} onClick={signInVK}>
							<SlSocialVkontakte size={30} color='white' />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
