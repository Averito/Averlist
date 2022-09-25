import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react'

export const useInput = (
	initialState = ''
): [
	string,
	ChangeEventHandler<HTMLInputElement>,
	Dispatch<SetStateAction<string>>
] => {
	const [value, setValue] = useState<string>(initialState)

	const onChange: ChangeEventHandler<HTMLInputElement> = event => {
		setValue(event.currentTarget.value)
	}

	return [value, onChange, setValue]
}
