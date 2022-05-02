import { message } from 'antd'

export const successMessage = (text: string) => {
	message.success(text)
}

export const errorMessage = (text: string) => {
	message.error(text)
}

export const warningMessage = (text: string) => {
	message.warning(text)
}
