import {
	FC,
	FormEventHandler,
	MouseEventHandler,
	PropsWithChildren,
	ReactNode
} from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import styles from './AuthLayout.module.scss'
import saoAuthLayout from '@assets/images/saoAuthLayout.webp'
import discordLogo from '@assets/images/discord.png'
import vkLogo from '@assets/images/vk.png'
import { Button } from '@components/Button'

interface AuthLayoutProps {
	title: string
	buttonText: string
	onSubmit: FormEventHandler
	additionalText?: ReactNode
	services?: boolean
}

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({
	children,
	buttonText,
	title,
	onSubmit,
	additionalText,
	services = true
}) => {
	const signInDiscord: MouseEventHandler<HTMLDivElement> = () =>
		signIn('discord')
	const signInVK: MouseEventHandler<HTMLDivElement> = () => signIn('vk')

	const containerBackground = {
		background: `url("${saoAuthLayout.src}") no-repeat 50% 105%/320px 320px`
	}

	return (
		<div className={styles.container} style={containerBackground}>
			<div className={styles.form}>
				<h1 className={styles.title}>{title}</h1>
				<form onSubmit={onSubmit}>
					{children}
					{additionalText && (
						<div className={styles.additionalText}>{additionalText}</div>
					)}
					{services && (
						<div className={styles.servicesButtons}>
							<div className={styles.discordButton} onClick={signInDiscord}>
								<Image src={discordLogo} width={30} height={30} alt='Дискорд' />
							</div>
							<div className={styles.vkButton} onClick={signInVK}>
								<Image src={vkLogo} width={30} height={30} alt='Вконтакте' />
							</div>
						</div>
					)}
					<div className={styles.submitButtonWrapper}>
						<Button className={styles.submitButton}>{buttonText}</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
