import { FC, MouseEventHandler, useRef } from 'react'
import cs from 'classnames'
import { IoIosArrowDown } from 'react-icons/io'

import styles from './PlayerSeriesSelect.module.scss'
import { PlayerSeriesSelectProps } from './PlayerSeriesSelect.types'
import { useOutside } from '@hooks/useOutside'
import { SelectMenu } from '@components/Select'
import { SeriesUsually } from '@anilibriaApi/types'

export const PlayerSeriesSelect: FC<PlayerSeriesSelectProps> = ({
	currentSeries,
	allSeries,
	onChangeSeries,
	open,
	setOpen
}) => {
	const menuRef = useRef<HTMLDivElement>(null)

	useOutside(menuRef, () => {
		setOpen(false)
	})

	const onClickToggleMenu: MouseEventHandler<HTMLButtonElement> = event => {
		event.stopPropagation()
		setOpen(prevState => !prevState)
	}

	const onClickChangeSeries = (
		series: SelectMenu<SeriesUsually>
	): MouseEventHandler<HTMLParagraphElement> => {
		return event => {
			event.stopPropagation()
			onChangeSeries?.(series)
			setOpen(false)
		}
	}

	return (
		<div className={styles.wrapper}>
			<button
				className={cs(styles.seriesSelectButton, { [styles.open]: open })}
				onClick={onClickToggleMenu}
			>
				<IoIosArrowDown className={styles.seriesSelectButtonIcon} size={14} />
				{currentSeries.label}
			</button>
			<div
				className={cs(styles.seriesSelectMenu, { [styles.open]: open })}
				ref={menuRef}
			>
				{allSeries.map(series => (
					<p
						className={cs(styles.seriesSelectMenuItem, {
							[styles.selected]: series.id === currentSeries.id
						})}
						key={series.id}
						onClick={onClickChangeSeries(series)}
					>
						{series.label}
					</p>
				))}
			</div>
		</div>
	)
}
