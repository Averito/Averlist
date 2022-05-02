import { FC, MouseEventHandler } from 'react'
import { Badge } from 'antd'
import {
	WechatOutlined,
	OrderedListOutlined,
	UnorderedListOutlined
} from '@ant-design/icons'
import classnames from 'classnames'

import styles from './styles.module.scss'

import { useWindowSize } from 'hooks/useWindowSize'
import { ViewType } from 'pages/Friends/types'
import { menuItems } from './menuItems'
import { useAppSelector } from 'hooks/useAppSelector'

interface FooterProps {
	viewType: ViewType
	setViewType: (viewType: ViewType) => unknown
}

export const Footer: FC<FooterProps> = ({ viewType, setViewType }) => {
	const { width } = useWindowSize()
	const iconSize = width <= 430 ? '20px' : '25px'
	const fontSize = width <= 430 ? '10px' : '14px'

	const meInvitations = useAppSelector(state => state.user.meInvitations)

	const onClickMenu: MouseEventHandler<HTMLDivElement> = event => {
		const { viewtype: newViewType } = event.currentTarget.dataset
		setViewType(newViewType as ViewType)
	}

	return (
		<div className={styles.footer}>
			{menuItems.map(menuItem => (
				<div
					key={menuItem.name}
					className={classnames(
						styles.footerItem,
						menuItem.viewType === viewType && styles.selected
					)}
					data-viewtype={menuItem.viewType}
					onClick={onClickMenu}
				>
					{menuItem.viewType === 'chat' && (
						<WechatOutlined style={{ fontSize: iconSize, color: 'white' }} />
					)}
					{menuItem.viewType === 'friends' && (
						<OrderedListOutlined
							style={{ fontSize: iconSize, color: 'white' }}
						/>
					)}
					{menuItem.viewType !== 'chat' && menuItem.viewType !== 'friends' && (
						<UnorderedListOutlined
							style={{ fontSize: iconSize, color: 'white' }}
						/>
					)}
					{menuItem.name === 'Входящие' ? (
						<Badge count={meInvitations.length}>
							<p
								className={styles.paragraph}
								style={{ fontSize, margin: '2.5px 0 0 0' }}
							>
								{menuItem.name}
							</p>
						</Badge>
					) : (
						<p className={styles.paragraph} style={{ fontSize }}>
							{menuItem.name}
						</p>
					)}
				</div>
			))}
		</div>
	)
}
