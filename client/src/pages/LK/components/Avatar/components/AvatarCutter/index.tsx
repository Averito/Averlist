import ReactCrop, { Crop } from 'react-image-crop'
import { FC, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import 'react-image-crop/dist/ReactCrop.css'

import styles from './AvatarCutter.module.scss'
import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'
import { errorToast, successToast } from '@helpers/toasts'

const Modal = dynamic(() => import('@components/Modal'), { ssr: false })

interface AvatarCutterProps {
	newAvatar: string
	cutterOpened: boolean
	onClose: () => unknown
	setNewAvatar: (newAvatarBase64: string) => unknown
	avatar: File
}

const initialCrop: Crop = {
	unit: '%',
	x: 25,
	y: 25,
	width: 50,
	height: 50
}

export const AvatarCutter: FC<AvatarCutterProps> = ({
	newAvatar,
	cutterOpened,
	onClose,
	avatar,
	setNewAvatar
}) => {
	const [crop, setCrop] = useState<Crop>(initialCrop)

	const image = useRef<HTMLImageElement>(null)

	const onClickSave = async () => {
		try {
			if (!image.current) return

			const sizes = {
				width: image.current.width,
				height: image.current.height
			}

			const user = await averlist.users.editAvatar(avatar, crop, sizes)
			successToast('Аватарка успешно изменена')
			userStore.setCurrentAvatar(user.avatar)
			setNewAvatar('')
			onClose()
		} catch {
			errorToast('Слишком большой вес аватарки, допускается не более 3мб.')
		}
	}

	return (
		<Modal
			opened={cutterOpened}
			title='Редактирование аватарки'
			okText='Сохранить'
			onCancel={onClose}
			onOk={onClickSave}
			closeOutside
		>
			<div className={styles.container}>
				{newAvatar && (
					<ReactCrop crop={crop} onChange={setCrop} aspect={1}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img ref={image} src={newAvatar} alt='new avatar' />
					</ReactCrop>
				)}
			</div>
		</Modal>
	)
}
