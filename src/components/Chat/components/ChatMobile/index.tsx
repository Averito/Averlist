import { FC } from 'react'

import { useAppSelector } from 'hooks/useAppSelector'
import { Dialog } from '../Dialog'
import { DialogDisplay } from '../DialogDisplay'

export const ChatMobile: FC = () => {
	const friendList = useAppSelector(state => state.user.friendList)
	const chatViewType = useAppSelector(state => state.chat.viewType)

	if (chatViewType === 'dialog') {
		return <DialogDisplay />
	}

	return (
		<>
			{friendList.map(friend => (
				<Dialog key={friend._id} user={friend} />
			))}
		</>
	)
}
