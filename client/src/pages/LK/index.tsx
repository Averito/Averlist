import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'
import { useAuth } from '@hooks/useAuth'
import { Meta } from '@utils/Meta'

interface LKProps {
	me: Averlist.User
}

export const LK: NextPage<LKProps> = ({ me }) => {
	useAuth()

	return (
		<>
			<Meta
				title='Averlist | Личный кабинет'
				description='Личный кабинет. Чувствуйте себя как дома, Господин.'
			/>
			<div>
				<p>Профиль</p>
			</div>
		</>
	)
}
