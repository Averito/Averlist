export interface Tab {
	name: string
	alias: string
}

export interface TabsProps {
	selectTab: (newTab: Tab) => unknown
	tabs: Tab[]
	currentTab: Tab
}
