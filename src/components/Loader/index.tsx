import { FC } from 'react'

import './styles.scss'

export const Loader: FC = () => {
	return (
		<div className='lds-ring'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
