import { User } from '../api/myApi/auth/types'

export const uniqueFriendList = (friendList: User[]): User[] => {
	const settedArray = Array.from(new Set(friendList.map(friend => friend._id)))

	return settedArray.map(
		userId => friendList.filter(friend => friend._id === userId)[0]
	)
}
