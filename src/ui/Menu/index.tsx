import { FC } from 'react'
import { Menu, MenuProps } from 'antd'

import styles from './styles.module.scss'

interface UIMenuProps {
	children: any
}

export const UIMenu: FC<UIMenuProps & MenuProps> = ({
	children,
	theme,
	mode,
	selectedKeys,
	onClick
}) => {
	return (
		<Menu
			className={styles.dropdown}
			mode={mode}
			selectedKeys={selectedKeys}
			onClick={onClick}
			theme={theme}
		>
			{children}
		</Menu>
	)
}
