import { ICellRendererParams } from 'ag-grid-community'
import Link from 'next/link'
import { FC } from 'react'

import styles from './NameCellRenderer.module.scss'
import { Averlist } from '@averlistApi/types'
import { Flex } from '@components/Flex'
import Image from 'next/image'

export const NameCellRenderer: FC<
	ICellRendererParams<Averlist.Anime, string>
> = ({ value, data }) => {
	const poster = data?.poster && (
		<Flex margin='0 8px 0 0'>
			<Image
				className={styles.poster}
				src={data.poster}
				height={30}
				width={20}
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
