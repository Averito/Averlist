import { FC } from 'react'

import { ViewTypeMobile } from '../../types'

interface FriendsMobileProps {
	viewType: ViewTypeMobile
}

export const FriendsMobile: FC<FriendsMobileProps> = ({ viewType }) => {
	return <p>Mobile</p>
}
