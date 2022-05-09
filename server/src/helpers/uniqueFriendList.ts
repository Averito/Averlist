import { UserEntity } from '../user/user.entity'

export const uniqueFriendList = (friendList: UserEntity[]) => {
	const newFriendList: UserEntity[] = []
	for (const idx in friendList) {
		if (newFriendList.every(friend => friend.id !== friendList[idx].id)) {
			newFriendList.push(friendList[idx])
		}
	}
	return newFriendList
}
