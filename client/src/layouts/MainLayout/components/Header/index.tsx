import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './Header.module.scss'
import defaultAvatar from '@assets/images/defaultAvatar.png'
import { useWindowSize } from '@hooks/useWindowSize'

export const Header: FC = () => {
	return (
		<header className={styles.container}>
			<div className={styles.containerBlock1}>
				<h1 className={styles.title} data-text='Averlist'>
					<Link href='/src/pages'>Averlist</Link>
				</h1>
				<nav>
					<ul className={styles.navList}>
						<li>Главная</li>
						<li>Новости</li>
						<li>Рандом</li>
						<li>
							<a
								href='https://discord.gg/h7jCXJ8d6w'
								target='_blank'
								rel='noreferrer'
							>
								Дискорд
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className={styles.containerBlock2}>
				<Image
					width={35}
					height={35}
					style={{ borderRadius: '50%' }}
					src={defaultAvatar}
					alt='Ава'
				/>
				<p className={styles.login}>Гость</p>
			</div>
		</header>
	)
}
