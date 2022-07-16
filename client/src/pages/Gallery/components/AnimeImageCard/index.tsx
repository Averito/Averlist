import { FC, MouseEventHandler } from 'react'
import Image from 'next/image'
import classnames from 'classnames'

import styles from './AnimeImageCard.module.scss'
import { Button } from '@components/Button'
import downloadIcon from '@assets/icons/download-2-line.png'

interface AnimeImageCardProps {
	animeImage: string
	onClick?: (animeImage: string) => MouseEventHandler<HTMLImageElement>
}

export const AnimeImageCard: FC<AnimeImageCardProps> = ({
	animeImage,
	onClick
}) => {
	const pointer = onClick ? styles.animeImageHasClick : ''

	return (
		<div className={styles.container}>
			<Image
				className={classnames(styles.animeImage, pointer)}
				src={animeImage}
				alt='Картинка'
				width={250}
				height={365}
				onClick={onClick && onClick(animeImage)}
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
