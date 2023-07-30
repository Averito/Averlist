import {
	FC,
	KeyboardEventHandler,
	MouseEventHandler,
	useRef,
	useState
} from 'react'
import cs from 'classnames'
import { AiOutlineSearch } from 'react-icons/ai'

import styles from './HeaderSearch.module.scss'
import { Input } from '@components'
import { useInput } from '@hooks/useInput'
import { useOutside } from '@hooks/useOutside'
import { useRouter } from 'next/router'

export const HeaderSearch: FC = () => {
	const router = useRouter()

	const [active, setActive] = useState<boolean>()
	const [search, setSearch, initialSetSearch] = useInput()

	const inputRef = useRef<HTMLInputElement>(null)

	useOutside(inputRef, () => setActive(false))

	const onClickSearchIcon: MouseEventHandler<SVGElement> = event => {
		event.stopPropagation()
		setActive(prevState => !prevState)
	}

	const onKeyDownSearchInput: KeyboardEventHandler<
		HTMLInputElement
	> = async event => {
		event.stopPropagation()
		if (event.code !== 'Enter') return

		await router.push({ pathname: '/anime', query: { search } })
		initialSetSearch('')
	}

	const inputWidth = active ? '240px' : '0'

	return (
		<div className={styles.searchContainer}>
			<AiOutlineSearch
				className={styles.searchIcon}
				onClick={onClickSearchIcon}
				size={22}
			/>
			<Input
				className={cs(styles.searchInput, { [styles.notActive]: !active })}
				ref={inputRef}
				value={search}
				width={inputWidth}
				onChange={setSearch}
				onKeyDown={onKeyDownSearchInput}
				placeholder='Поиск'
				margin='0 0 0 12px'
			/>
		</div>
	)
}
