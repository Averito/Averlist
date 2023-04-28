import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { IoArrowBackOutline, IoOptionsOutline } from 'react-icons/io5'
import cs from 'classnames'

import styles from './PlayerOptions.module.scss'
import { PlayerOptionsPage, PlayerOptionsProps } from './PlayerOptions.types'
import { PlayerIcon } from '@components/Player/components'
import { useOutside } from '@hooks/useOutside'
import { Flex } from '@components'
import { SelectMenu } from '@components/Select'
import { Quality } from '@components/Player'

export const PlayerOptions: FC<PlayerOptionsProps> = ({
	setOpen,
	open,
	currentQuality,
	qualities,
	onChangeQuality
}) => {
	const menuRef = useRef<HTMLDivElement>(null)
	const [menuHeight, setMenuHeight] = useState<number>(0)
	const [currentPage, setCurrentPage] = useState<PlayerOptionsPage>('main')

	const toMain = () => {
		setCurrentPage('main')
	}

	useEffect(() => {
		if (!menuRef.current) return
		setMenuHeight(menuRef.current.clientHeight)
	}, [currentPage])

	const onClickOptions: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		setOpen(prevState => !prevState)
	}

	useOutside(menuRef, () => {
		setOpen(false)
		toMain()
	})

	const onClickSelectQuality: MouseEventHandler<
		HTMLParagraphElement
	> = event => {
		event.stopPropagation()
		setCurrentPage('quality')
	}
	const onClickChangeQuality = (
		quality: SelectMenu<Quality>
	): MouseEventHandler<HTMLParagraphElement> => {
		return event => {
			event.stopPropagation()
			onChangeQuality?.(quality)
			toMain()
			setOpen(false)
		}
	}

	const onClickBack: MouseEventHandler<HTMLParagraphElement> = event => {
		event.stopPropagation()
		toMain()
	}

	return (
		<div className={styles.wrapper}>
			<PlayerIcon icon={IoOptionsOutline} onClick={onClickOptions} />
			<div
				ref={menuRef}
				style={{ top: `calc(-20px + -${menuHeight}px)` }}
				className={cs(styles.menu, { [styles.open]: open })}
			>
				{currentPage === 'main' && (
					<>
						<p className={styles.menuItem} onClick={onClickSelectQuality}>
							Качество: {currentQuality.label}
						</p>
					</>
				)}
				{currentPage === 'quality' && (
					<>
						<Flex
							alignItems='center'
							className={styles.menuItem}
							onClick={onClickBack}
						>
							<IoArrowBackOutline size={14} />
							<p>Назад</p>
						</Flex>
						{qualities.map(quality => (
							<p
								className={cs(styles.menuItem, {
									[styles.selected]: quality.id === currentQuality.id
								})}
								onClick={onClickChangeQuality(quality)}
								key={quality.id}
							>
								{quality.label}
							</p>
						))}
					</>
				)}
			</div>
		</div>
	)
}
