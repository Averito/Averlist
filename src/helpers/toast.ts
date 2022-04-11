import { toast as toastLib } from 'react-toastify'

export const successToast = (text: string) => {
	toastLib.success(text, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined
	})
}

export const errorToast = (text: string) => {
	toastLib.error(text, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined
	})
}
