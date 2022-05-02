import { FC } from 'react'
import { Menu, Badge, Typography } from 'antd'
import {
	WechatOutlined,
	UnorderedListOutlined,
	OrderedListOutlined
} from '@ant-design/icons'

import { ViewType } from 'pages/Friends/types'
import { useAppSelector } from 'hooks/useAppSelector'

interface HeaderProps {
	viewType: ViewType
	setViewType: (viewType: ViewType) => unknown
}

export const Header: FC<HeaderProps> = ({ viewType, setViewType }) => {
	const meInvitations = useAppSelector(state => state.user.meInvitations)

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
			<Menu.Item key='friends' icon={<OrderedListOutlined />}>
				Список друзей
			</Menu.Item>
			<Menu.Item key='invitations' icon={<UnorderedListOutlined />}>
				<Badge count={meInvitations.length}>
					<Typography.Paragraph>Входящие</Typography.Paragraph>
				</Badge>
			</Menu.Item>
			<Menu.Item key='myInvitations' icon={<UnorderedListOutlined />}>
				Мои заявки
			</Menu.Item>
		</Menu>
	)
}
