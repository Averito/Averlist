export interface ModalProps {
	opened: boolean
	title?: string
	onCancel?: () => unknown
	onOk?: () => unknown
	okText?: string
	width?: string
	closeOutside?: boolean
}
