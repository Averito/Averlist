import { toast, ToastOptions } from 'react-toastify'

const toastOptionsByDefault: ToastOptions = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: true,
	progress: undefined
}

export const successToast = (text: string) => {
	toast.success(text, toastOptionsByDefault)
}

export const errorToast = (text: string) => {
	toast.error(text, toastOptionsByDefault)
}
