import { FC, useState } from 'react'

import styles from './styles.module.scss'
import { ViewTypeDesktop, ViewTypeMobile } from './types'
import { FriendsMobile } from './components/FriendsMobile'
import { FriendsDesktop } from './components/FriendsDesktop'
import { useWindowSize } from 'hooks/useWindowSize'

export const Friends: FC = () => {
	const { width } = useWindowSize()
	const isMobile = width <= 768

	const [viewTypeMobile] = useState<ViewTypeMobile>('friends')
	const [viewTypeDesktop, setViewTypeDesktop] =
		useState<ViewTypeDesktop>('chat')

	const onClickSetViewTypeDesktop = (viewType: ViewTypeDesktop) => {
		setViewTypeDesktop(viewType)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{isMobile ? (
					<FriendsMobile viewType={viewTypeMobile} />
				) : (
					<FriendsDesktop
						viewType={viewTypeDesktop}
						setViewType={onClickSetViewTypeDesktop}
					/>
				)}
			</div>
		</div>
	)
}
