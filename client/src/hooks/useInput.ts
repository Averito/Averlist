import { ChangeEventHandler, useState } from 'react'

export const useInput = (initialState = '') => {
	const [value, setValue] = useState<string>(initialState)

	const onChange: ChangeEventHandler<HTMLInputElement> = event => {
		setValue(event.currentTarget.value)
	}

	return { value, setValue: onChange, setValueNotMod: setValue }
}
