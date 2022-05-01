import { FC } from 'react'
import { useAppSelector } from 'hooks/useAppSelector'
import { UserComponent } from '../../../../components/UserComponent'

export const FriendList: FC = () => {
	const friendList = useAppSelector(state => state.user.friendList)

	return (
		<>
			{friendList.map(friend => (
				<UserComponent key={friend._id} user={friend} />
			))}
		</>
	)
}
