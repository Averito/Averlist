import { useState } from 'react'

export const useToggle = (initialValue: boolean = false) => {
	const [value, setValue] = useState<boolean>(initialValue)

	const setValueMod = () => {
		setValue(!value)
	}

	return { value, setValue: setValueMod }
}
