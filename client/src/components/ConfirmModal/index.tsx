import { FC, MouseEventHandler } from 'react'
import PureModal from 'react-pure-modal'

import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
	opened: boolean
	bodyText?: string
	okButtonText: string
	cancelButtonText: string
	title: string
	onOK: MouseEventHandler<HTMLButtonElement>
	onCancel: MouseEventHandler<HTMLButtonElement>
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
	opened,
	bodyText,
	okButtonText,
	cancelButtonText,
	onCancel,
	onOK,
	title
}) => {
	return (
		<PureModal
			className={styles.confirmModalContainer}
			isOpen={opened}
			replace={true}
			width='380px'
		>
			<div className={styles.confirmModal}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.content}>
					<p className={styles.bodyText}>{bodyText}</p>
					<div className={styles.confirmModalFooter}>
						<button className={styles.cancelButton} onClick={onCancel}>
							{cancelButtonText}
						</button>
						<button className={styles.okButton} onClick={onOK}>
							{okButtonText}
						</button>
					</div>
				</div>
			</div>
		</PureModal>
	)
}
