import React, { FC } from 'react'
import { Typography } from 'antd'

import styles from './styles.module.scss'
import { ANILIBRIA_URI } from 'variebles'
import { useWindowSize } from 'hooks/useWindowSize'
import { Description } from '../Description'
import { DescriptionMobile } from '../DescriptionMobile'
import { AddToList } from 'components/AddToList'
import { Player } from '../Player'
import { Status } from 'api/myApi/anime/types'
import { Title } from '../../../../api/anilibriaApi/types'

interface AnimePageDesktopProps {
	titleMain: Title
	currentStatus: Status | -1
}

export const AnimePageDesktop: FC<AnimePageDesktopProps> = ({
	titleMain,
	currentStatus
}) => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	return (
		<div>
			<div className={styles.animeLibraryItemMainInfo}>
				<div>
					<div className={styles.descriptions}>
						{width <= 1157 ? (
							<DescriptionMobile titleMain={titleMain} status={currentStatus} />
						) : (
							<Description titleMain={titleMain} status={currentStatus} />
						)}
					</div>
					{isMobile ? (
						<>
							<div className={styles.poster}>
								<div className={styles.animeLibraryItemPoster}>
									<img
										src={
											ANILIBRIA_URI +
											(isMobile
												? titleMain?.posters?.small?.url
												: titleMain?.posters?.original?.url)
										}
										alt='Не загрузилось('
									/>
								</div>
								<AddToList animeName={titleMain?.names?.ru} />
							</div>
							<div className={styles.description}>
								<Typography.Paragraph>
									{titleMain?.description}
								</Typography.Paragraph>
							</div>
						</>
					) : (
						<>
							<div className={styles.description}>
								<Typography.Paragraph>
									{titleMain?.description}
								</Typography.Paragraph>
							</div>
							<div className={styles.poster}>
								<div className={styles.animeLibraryItemPoster}>
									<img
										src={
											ANILIBRIA_URI +
											(isMobile
												? titleMain?.posters?.small?.url
												: titleMain?.posters?.original?.url)
										}
										alt='Не загрузилось('
									/>
								</div>
								<AddToList animeName={titleMain?.names?.ru} />
							</div>
						</>
					)}
				</div>
				<div>
					<Player titleMain={titleMain} />
				</div>
			</div>
		</div>
	)
}
