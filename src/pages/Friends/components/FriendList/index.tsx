import { FC } from 'react'
import { Typography } from 'antd'

import { UserComponent } from 'components/UserComponent'
import { useAppSelector } from 'hooks/useAppSelector'

export const FriendList: FC = () => {
	const friendList = useAppSelector(state => state.user.friendList)

	return (
		<>
			{friendList.map(friend => (
				<UserComponent key={friend._id} user={friend} />
			))}
			{friendList.length === 0 && (
				<Typography.Paragraph>У вас нет друзей(</Typography.Paragraph>
			)}
		</>
	)
}
