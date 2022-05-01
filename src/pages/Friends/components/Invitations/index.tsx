import { FC } from 'react'

import styles from './styles.module.scss'
import { Invitation } from './components/Invitation'
import { useAppSelector } from 'hooks/useAppSelector'
import { Typography } from 'antd'

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
			{type === 'me' && meInvitations.length === 0 && (
				<Typography.Paragraph>
					Нет текущих запросов в друзья
				</Typography.Paragraph>
			)}
			{type === 'my' &&
				myInvitations.map(invitation => (
					<Invitation key={invitation._id} invitation={invitation} type='my' />
				))}
			{type === 'my' && myInvitations.length === 0 && (
				<Typography.Paragraph>
					Вы не отправляли никому запрос в друзья
				</Typography.Paragraph>
			)}
		</div>
	)
}
