import defaultAvatar from '@assets/images/defaultAvatar.png'

const AVERLIST_AVATARS_URI = process.env.NEXT_PUBLIC_AVERLIST_AVATARS_URI

export const getCurrentAvatar = (avatar?: string) => {
	if (!avatar) return defaultAvatar.src
	if (avatar.includes('https')) return avatar
	return `${AVERLIST_AVATARS_URI}${avatar}`
}
