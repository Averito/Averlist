import { FC } from 'react'

import styles from './styles.module.scss'
import { ViewType } from 'pages/Friends/types'
import { Chat } from 'components/Chat'
import { Footer } from './components/Footer'
import { Invitations } from '../Invitations'
import { FriendList } from '../FriendList'

interface FriendsMobileProps {
	viewType: ViewType
	setViewType: (viewType: ViewType) => unknown
}

export const FriendsMobile: FC<FriendsMobileProps> = ({
	viewType,
	setViewType
}) => {
	return (
		<>
			{viewType === 'chat' && <Chat />}
			{viewType === 'friends' && <FriendList />}
			{viewType === 'invitations' && <Invitations type='me' />}
			{viewType === 'myInvitations' && <Invitations type='my' />}
			<div className={styles.placeholder} />
			<Footer viewType={viewType} setViewType={setViewType} />
		</>
	)
}
