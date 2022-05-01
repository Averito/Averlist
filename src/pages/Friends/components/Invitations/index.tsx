import { FC } from 'react'

import styles from './styles.module.scss'
import { Invitation } from './components/Invitation'
import { useAppSelector } from 'hooks/useAppSelector'

interface InvitationsProps {
	type: 'me' | 'my'
}

export const Invitations: FC<InvitationsProps> = ({ type }) => {
	const meInvitations = useAppSelector(state => state.user.meInvitations)
	const myInvitations = useAppSelector(state => state.user.myInvitations)

	return (
		<div className={styles.wrapper}>
			{type === 'me' &&
				meInvitations.map(invitation => (
					<Invitation key={invitation._id} invitation={invitation} type='me' />
				))}
			{type === 'my' &&
				myInvitations.map(invitation => (
					<Invitation key={invitation._id} invitation={invitation} type='my' />
				))}
		</div>
	)
}
