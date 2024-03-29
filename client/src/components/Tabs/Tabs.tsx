import { FC, memo, MouseEventHandler } from 'react'
import classnames from 'classnames'

import styles from './Tabs.module.scss'
import { Tab, TabsProps } from './Tabs.types'

export const Tabs: FC<TabsProps> = memo(({ selectTab, tabs, currentTab }) => {
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
				const selected =
					tab.alias === currentTab.alias ? styles.selectedTab : ''

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
})
