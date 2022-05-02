import { ChangeEvent, useState } from 'react'

export const useInput = (initialValue: string) => {
	const [value, setValue] = useState<string>(initialValue)

	const setValueMod = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value)
	}

	return { value, setValue: setValueMod }
}
