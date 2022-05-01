import { FC } from 'react'

import { ViewTypeDesktop } from '../../types'
import { Header } from './components/Header'
import { Invitations } from '../Invitations'

interface FriendsDesktopProps {
	viewType: ViewTypeDesktop
	setViewType: (viewType: ViewTypeDesktop) => unknown
}

export const FriendsDesktop: FC<FriendsDesktopProps> = ({
	viewType,
	setViewType
}) => {
	return (
		<>
			<Header viewType={viewType} setViewType={setViewType} />
			<div style={{ margin: '10px 0 0 0' }}>
				{viewType === 'invitations' && <Invitations />}
			</div>
		</>
	)
}
