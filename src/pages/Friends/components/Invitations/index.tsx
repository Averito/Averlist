import { FC } from 'react'

import styles from './styles.module.scss'
import { Invitation } from './components/Invitation'
import { useAppSelector } from 'hooks/useAppSelector'

export const Invitations: FC = () => {
	const meInvitations = useAppSelector(state => state.user.meInvitations)

	return (
		<div className={styles.wrapper}>
			{meInvitations.map(invitation => (
				<Invitation key={invitation._id} invitation={invitation} />
			))}
		</div>
	)
}
