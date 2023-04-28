import { Dispatch, SetStateAction } from 'react'

export interface PlayerVolumeProps {
	volume: number
	setVolume: (volume: number) => void
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
