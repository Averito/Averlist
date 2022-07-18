import { ChangeEventHandler, useState } from 'react'

export const useInput = () => {
	const [value, setValue] = useState<string>('')

	const onChange: ChangeEventHandler<HTMLInputElement> = event => {
		setValue(event.currentTarget.value)
	}

	return { value, setValue: onChange }
}
