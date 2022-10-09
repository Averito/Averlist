import { FC, MouseEventHandler } from 'react'
import { BsDownload } from 'react-icons/bs'

import styles from './TorrentDownloads.module.scss'
import { Title } from '@anilibriaApi/types'
import { Flex } from '@components/Flex'

interface TorrentDownloadsProps {
	title: Title
}

const ANILIBRIA_URI = process.env.NEXT_PUBLIC_ANILIBRIA_URI

export const TorrentDownloads: FC<TorrentDownloadsProps> = ({ title }) => {
	return (
		<Flex customClassName={styles.container} margin='0 0 20px 0'>
			{title.torrents?.list.map(torrentItem => (
				<div className={styles.item} key={torrentItem.id}>
					<p>{torrentItem.quality.string}</p>
					<p>Серия {torrentItem.series.string}</p>
					<a href={`${ANILIBRIA_URI}${torrentItem.url}`}>
						<BsDownload size={16} />
						{(torrentItem.total_size / 1024 / 1024 / 1024).toFixed(2)} GB
					</a>
				</div>
			))}
		</Flex>
	)
}
