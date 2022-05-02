import { FC } from 'react'

import { ViewType } from '../../types'
import { Header } from './components/Header'
import { Chat } from 'components/Chat'
import { Invitations } from '../Invitations'
import { FriendList } from '../FriendList'

interface FriendsDesktopProps {
	viewType: ViewType
	setViewType: (viewType: ViewType) => unknown
}

export const FriendsDesktop: FC<FriendsDesktopProps> = ({
	viewType,
	setViewType
}) => {
	return (
		<>
			<Header viewType={viewType} setViewType={setViewType} />
			<div style={{ margin: '10px 0 0 0' }}>
				{viewType === 'invitations' && <Invitations type='me' />}
				{viewType === 'myInvitations' && <Invitations type='my' />}
				{viewType === 'friends' && <FriendList />}
				{viewType === 'chat' && <Chat />}
			</div>
		</>
	)
}
