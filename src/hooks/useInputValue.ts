import { useState } from 'react'

export const useInputValue = (initialValue: string) => {
	const [value, setValue] = useState<string>(initialValue)

	const setValueMod = (newValue: string) => {
		setValue(newValue)
	}

	return { value, setValue: setValueMod }
}
