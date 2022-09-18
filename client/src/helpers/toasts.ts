import { toast } from 'react-toastify'

export const successToast = (message: string) => {
	toast.success(message)
}

export const errorToast = (message: string) => {
	toast.error(message)
}
