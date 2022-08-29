import React, { FC, MouseEventHandler, PropsWithChildren, useState } from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import styles from './Dropdown.module.scss'

interface DropdownMenu {
	id: number
	label: string
	href?: string
	onClick?: MouseEventHandler<HTMLDivElement>
}

interface DropdownProps {
	options: DropdownMenu[]
}

export const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({ options, children }) => {
	const [active, setActive] = useState<boolean>(false)

	let timeout: ReturnType<typeof setTimeout>
	const onMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
		clearTimeout(timeout)
		setActive(true)
	}
	const onMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
		timeout = setTimeout(() => setActive(false), 200)
	}

	const dropdownMenuActive = active ? styles.dropdownMenuOn : styles.dropdownMenuOff

	return (
		<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<div>
				{children}
			</div>
			<div className={styles.dropdownWrapper}>
				<div className={classnames(styles.dropdownMenu, dropdownMenuActive)}>
					{options.map(option => (
						<React.Fragment key={option.id}>
							{option.href ? (
								<div className={styles.menuItem} onClick={option.onClick}>
									<Link href={option.href}>
										{option.label}
									</Link>
								</div>
							) : (
								<div className={styles.menuItem} onClick={option.onClick}>{option.label}</div>
							)}
						</React.Fragment>
						)
					)}
				</div>
			</div>
		</div>
	)
}
