import { ChangeEventHandler, FC, FocusEventHandler, memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import styles from './Autocomplete.module.scss'

export interface AutocompleteMenu {
	id: number
	name: string
}

interface AutocompleteProps {
	value: string
	onChange: (value: string) => unknown
	placeholder: string
	name: string
	width?: string
	menuList: AutocompleteMenu[]
}

export const Autocomplete: FC<AutocompleteProps> = memo(
	({ value, onChange, placeholder, name, width, menuList }) => {
		const widthStyle = { width: width ?? '240px' }

		const [currentMenuIdx, setCurrentMenuIdx] = useState<number | null>(null)
		const [inputFocus, setInputFocus] = useState<boolean>(false)

		const onFocus: FocusEventHandler<HTMLInputElement> = () => {
			setInputFocus(true)
		}
		const onBlur: FocusEventHandler<HTMLInputElement> = () => {
			setInputFocus(false)
			setCurrentMenuIdx(null)
		}

		const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
			if (!inputFocus) setInputFocus(true)
			onChange(event.currentTarget.value)
		}

		const onClickMenu = (menu: AutocompleteMenu) => {
			return () => {
				onChange(menu.name)
			}
		}

		useEffect(() => {
			const keyDownHandler = (event: KeyboardEvent) => {
				if (!inputFocus) return

				if (event.code === 'ArrowDown') {
					setCurrentMenuIdx(prevState => {
						const normalizePrevState = prevState ?? -1
						return normalizePrevState + 1 < menuList.length
							? normalizePrevState + 1
							: 0
					})
				}
				if (event.code === 'ArrowUp') {
					setCurrentMenuIdx(prevState => {
						const normalizePrevState = prevState ?? -1
						return normalizePrevState - 1 >= 0
							? normalizePrevState - 1
							: menuList.length - 1
					})
				}

				if (event.code === 'Enter') {
					if (!currentMenuIdx && currentMenuIdx !== 0) return
					onChange(menuList[currentMenuIdx].name)
					setInputFocus(false)
					setCurrentMenuIdx(null)
				}
			}

			document.addEventListener('keydown', keyDownHandler)
			return () => document.removeEventListener('keydown', keyDownHandler)
		}, [inputFocus, currentMenuIdx, menuList, onChange])

		const menuListActiveClass = inputFocus
			? styles.menuListOn
			: styles.menuListOff

		return (
			<div className={styles.container} style={widthStyle}>
				<input
					className={styles.autocomplete}
					name={name}
					value={value}
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChangeInput}
					autoComplete='off'
					placeholder={placeholder}
				/>
				<ul className={classnames(styles.menuList, menuListActiveClass)}>
					{menuList.map(menu => {
						const menuFocused =
							currentMenuIdx !== null
								? menuList[currentMenuIdx].id === menu.id
									? styles.selectedMenu
									: undefined
								: undefined

						return (
							<li
								className={menuFocused}
								key={menu.id}
								onClick={onClickMenu(menu)}
							>
								{menu.name}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
)
