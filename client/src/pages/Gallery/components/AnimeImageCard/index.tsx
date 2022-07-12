import { FC, MouseEventHandler } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import styles from './AnimeImageCard.module.scss'
import { Button } from '@components/Button'
import downloadIcon from '@assets/icons/download-2-line.png'

interface AnimeImageCardProps {
	animeImage: string
}

export const AnimeImageCard: FC<AnimeImageCardProps> = ({ animeImage }) => {
	return (
		<div className={styles.container}>
			<Image
				className={styles.animeImage}
				src={animeImage}
				alt='Картинка'
				width={250}
				height={365}
			/>
			<Button
				className={styles.downloadButton}
				link={true}
				href={animeImage}
				download={true}
			>
				<Image src={downloadIcon} width={20} height={20} alt='Скачать' />
			</Button>
		</div>
	)
}
