import { FC, MouseEventHandler } from 'react'
import classnames from 'classnames'

import styles from './Tabs.module.scss'

export interface Tab {
	name: string
	alias: string
}

interface TabsProps {
	selectTab: (newTab: Tab) => unknown
	tabs: Tab[]
	currentTab: Tab
}

export const Tabs: FC<TabsProps> = ({ selectTab, tabs, currentTab }) => {
	const onClickTab = (
		newSelectedTab: Tab
	): MouseEventHandler<HTMLDivElement> => {
		return () => {
			selectTab(newSelectedTab)
		}
	}

	return (
		<div className={styles.tabsContainer}>
			{tabs.map(tab => {
				const selected = tab.alias === currentTab.alias ? styles.selectedTab : ''

				return (
					<div
						className={classnames(styles.tab, selected)}
						key={tab.alias}
						onClick={onClickTab(tab)}
					>
						{tab.name}
					</div>
				)
			})}
		</div>
	)
}
