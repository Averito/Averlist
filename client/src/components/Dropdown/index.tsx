import React, { FC, MouseEventHandler, PropsWithChildren, useRef, useState } from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import styles from './Dropdown.module.scss'
import { useOutside } from '@hooks/useOutside'

export interface DropdownMenu {
	id: number
	label: string
	href?: string
	onClick?: MouseEventHandler<HTMLDivElement>
}

interface DropdownProps {
	options: DropdownMenu[]
	onClick?: boolean
	margin?: string
}

export const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
	options,
	onClick,
	margin,
	children
}) => {
	const [active, setActive] = useState<boolean>(false)

	let timeout: ReturnType<typeof setTimeout>
	const onMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
		clearTimeout(timeout)
		setActive(true)
	}
	const onMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
		timeout = setTimeout(() => setActive(false), 200)
	}

	const open: MouseEventHandler<HTMLDivElement> = event => {
		event.stopPropagation()
		if (active) return setActive(false)
		setActive(true)
	}

	const dropdownChildren = useRef<HTMLDivElement>(null)
	useOutside(dropdownChildren, () => {
		if (!onClick) return
		setActive(false)
	})

	const dropdownMenuActive = active
		? onClick
			? styles.dropdownMenuOnClickMod
			: styles.dropdownMenuOn
		: styles.dropdownMenuOff

	const marginStyle = { margin }

	return (
		<div
			onMouseEnter={!onClick ? onMouseEnter : undefined}
			onMouseLeave={!onClick ? onMouseLeave : undefined}
		>
			<div
				ref={dropdownChildren}
				style={marginStyle}
				onClick={onClick ? open : undefined}
			>
				{children}
			</div>
			<div className={styles.dropdownWrapper}>
				<div className={classnames(styles.dropdownMenu, dropdownMenuActive)}>
					{options.map(option => (
						<React.Fragment key={option.id}>
							{option.href ? (
								<div className={styles.menuItem} onClick={option.onClick}>
									<Link href={option.href}>{option.label}</Link>
								</div>
							) : (
								<div className={styles.menuItem} onClick={option.onClick}>
									{option.label}
								</div>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	)
}
