import { FC } from 'react'
import { Menu } from 'antd'
import { WechatOutlined, UnorderedListOutlined } from '@ant-design/icons'

import { ViewTypeDesktop } from 'pages/Friends/types'

interface HeaderProps {
	viewType: ViewTypeDesktop
	setViewType: (viewType: ViewTypeDesktop) => unknown
}

export const Header: FC<HeaderProps> = ({ viewType, setViewType }) => {
	const onClickSetViewType = (newViewType: any) => {
		setViewType(newViewType.key)
	}

	return (
		<Menu
			mode='horizontal'
			selectedKeys={[viewType]}
			onClick={onClickSetViewType}
		>
			<Menu.Item key='chat' icon={<WechatOutlined />}>
				Чат
			</Menu.Item>
			<Menu.Item key='invitations' icon={<UnorderedListOutlined />}>
				Ожидание
			</Menu.Item>
		</Menu>
	)
}
