import Link from 'next/link'
import { FC } from 'react'

import styles from './NameCellRenderer.module.scss'
import { Flex } from '@components/Flex'
import Image from 'next/image'
import { NameCellRendererProps } from './NameCellRenderer.types'

export const NameCellRenderer: FC<NameCellRendererProps> = ({
	value,
	data
}) => {
	const poster = data?.poster && (
		<Flex margin='0 8px 0 0' className={styles.posterWrapper}>
			<Image
				className={styles.poster}
				src={data.poster}
				layout='fill'
				alt='Постер'
			/>
		</Flex>
	)

	return data?.anilibriaCode ? (
		<Flex alignItems='center'>
			{poster}
			<Link href={`/anime/${data?.anilibriaCode}`}>
				<p className={styles.link}>{value}</p>
			</Link>
		</Flex>
	) : (
		<Flex alignItems='center'>
			{poster}
			<p className={styles.text}>{value}</p>
		</Flex>
	)
}
