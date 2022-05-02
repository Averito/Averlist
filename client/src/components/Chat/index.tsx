import { FC } from 'react'

import { ChatDesktop } from './components/ChatDesktop'
import { ChatMobile } from './components/ChatMobile'
import { useWindowSize } from 'hooks/useWindowSize'

export const Chat: FC = () => {
	const { isMobile } = useWindowSize()

	return isMobile ? <ChatMobile /> : <ChatDesktop />
}
