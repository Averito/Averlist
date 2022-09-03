import { useEffect } from 'react'
import { NextPage } from 'next'

import { Averlist } from '@averlistApi/types'

interface LKProps {
	me: Averlist.User
	reload: boolean
}

export const LK: NextPage<LKProps> = ({ me, reload }) => {
	useEffect(() => {
		if (reload) window.location.reload()
	}, [reload])

	return (
		<div>
			<p>Профиль</p>
		</div>
	)
}
