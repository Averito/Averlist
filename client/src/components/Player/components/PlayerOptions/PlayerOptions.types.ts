import { Dispatch, SetStateAction } from 'react'

import { SelectMenu } from '@components/Select'
import { Quality } from '@components/Player'

export interface PlayerOptionsProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	qualities: SelectMenu<Quality>[]
	currentQuality: SelectMenu<Quality>
	onChangeQuality?: (quality: SelectMenu<Quality>) => void
}

export type PlayerOptionsPage = 'main' | 'quality'
