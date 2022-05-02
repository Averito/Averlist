import { FC, useState } from 'react'

import styles from './styles.module.scss'
import { ViewType } from './types'
import { FriendsMobile } from './components/FriendsMobile'
import { FriendsDesktop } from './components/FriendsDesktop'
import { useWindowSize } from 'hooks/useWindowSize'

export const Friends: FC = () => {
	const { isMobile } = useWindowSize()

	const [viewType, setViewType] = useState<ViewType>('chat')

	const onClickSetViewTypeDesktop = (viewType: ViewType) => {
		setViewType(viewType)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{isMobile ? (
					<FriendsMobile
						viewType={viewType}
						setViewType={onClickSetViewTypeDesktop}
					/>
				) : (
					<FriendsDesktop
						viewType={viewType}
						setViewType={onClickSetViewTypeDesktop}
					/>
				)}
			</div>
		</div>
	)
}
