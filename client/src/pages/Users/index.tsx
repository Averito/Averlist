import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { Input, Pagination } from 'antd'

import styles from './styles.module.scss'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { getAllUsersThunk } from 'store/reducers/usersReducer/usersThunks'
import { UserComponent } from 'components/UserComponent'

export const Users: FC = () => {
	const pageSize = 15

	const dispatch = useAppDispatch()

	const users = useAppSelector(state => state.users.users)

	const [search, setSearch] = useState<string>('')
	const [currentPage, setCurrentPage] = useState<number>(1)

	const onChangeSearchInput: ChangeEventHandler<HTMLInputElement> = event => {
		setSearch(event.currentTarget.value)
	}

	useEffect(() => {
		dispatch(getAllUsersThunk())
	}, [dispatch])

	const usersList = users.filter(user => user.login.includes(search))

	return (
		<div className={styles.wrapper}>
			<div className={styles.users}>
				<div className={styles.search}>
					<Input
						placeholder='Поиск'
						value={search}
						onChange={onChangeSearchInput}
					/>
				</div>
				<div className={styles.pagination}>
					<Pagination
						pageSize={pageSize}
						onChange={setCurrentPage}
						total={usersList.length}
					/>
				</div>
				{usersList
					.slice((currentPage - 1) * pageSize, currentPage * pageSize)
					.map(user => (
						<UserComponent key={user._id} user={user} />
					))}
			</div>
		</div>
	)
}
