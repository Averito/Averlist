import { ChangeEventHandler, FC, FocusEventHandler, memo, useEffect, useState } from 'react'
import classnames from 'classnames'

import styles from './Autocomplete.module.scss'
import { defineEmits } from '@helpers/defineEmits'
import { AutocompleteMenu, AutocompleteProps } from '@components/Autocomplete/Autocomplete.types'

export const Autocomplete: FC<AutocompleteProps> = memo(
	({
		value,
		onChange,
		onSelect,
		placeholder,
		name,
		width,
		menuList,
		maxMenuListLength = 15,
		margin = '0'
	}) => {
		const containerStyle = { width: width ?? '240px', margin }

		const [currentMenuIdx, setCurrentMenuIdx] = useState<number | null>(null)
		const [inputFocus, setInputFocus] = useState<boolean>(false)

		const emit = defineEmits<'change' | 'select'>({
			change: onChange,
			select: onSelect ?? (() => {})
		})

		const onFocus: FocusEventHandler<HTMLInputElement> = () => {
			setInputFocus(true)
		}
		const onBlur: FocusEventHandler<HTMLInputElement> = () => {
			setInputFocus(false)
			setCurrentMenuIdx(null)
		}

		const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
			if (!inputFocus) setInputFocus(true)
			emit('change', event.currentTarget.value)
		}

		const onClickMenu = (menu: AutocompleteMenu) => {
			return () => {
				emit('change', menu.name)
				emit('select', menu)
			}
		}

		const slicedMenuList = menuList.slice(0, maxMenuListLength)

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
					emit('change', menuList[currentMenuIdx].name)
					emit('select', menuList[currentMenuIdx])
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
			<div className={styles.container} style={containerStyle}>
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
					{slicedMenuList.map(menu => {
						const menuFocused =
							currentMenuIdx !== null
								? menuList[currentMenuIdx]?.id === menu.id
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
