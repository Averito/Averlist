import { Observer } from 'mobx-react-lite'
import { ChangeEventHandler, FC, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'

import styles from './Avatar.module.scss'
import { AvatarCutter } from '@pages/LK/components/Avatar/components/AvatarCutter'
import { NicknameEdit } from '@pages/LK/components/Avatar/components/NicknameEdit'
import userStore from '@stores/user.store'
import { MdEdit } from 'react-icons/md'

const FILE_MAX_SIZE = process.env.NEXT_PUBLIC_FILE_MAX_SIZ

export const Avatar: FC = () => {
	const [newAvatarBase64, setNewAvatarBase64] = useState<string>('')
	const [newAvatar, setNewAvatar] = useState<File>({} as File)
	const [avatarCutterOpened, setAvatarCutterOpened] = useState<boolean>(false)

	const onChangeAvatar: ChangeEventHandler<HTMLInputElement> = event => {
		if (!event.currentTarget.files?.length) return

		const avatar = event.currentTarget.files[0]

		const fileReader = new FileReader()
		fileReader.readAsDataURL(avatar)
		fileReader.addEventListener('load', () => {
			if (!fileReader.result) toast.error('Нужна картинка')
			setNewAvatarBase64(fileReader.result as string)
			setAvatarCutterOpened(true)
			setNewAvatar(avatar)
		})
	}

	const onClickCloseAvatarCutter = () => {
		setAvatarCutterOpened(false)
	}

	return (
		<div className={styles.avatar}>
			<div className={styles.avatarWrapper}>
				<Observer>
					{() => (
						<>
							<Image
								width={200}
								height={200}
								src={userStore.currentAvatar}
								alt='Ава'
							/>
							<label className={styles.avatarSelector} htmlFor='avatarPicker'>
								<MdEdit size={30} cursor='pointer' />
								<input
									onInput={onChangeAvatar}
									style={{ display: 'none' }}
									id='avatarPicker'
									type='file'
									size={+(FILE_MAX_SIZE as string)}
									accept='.png, .jpg, .jpeg, .gif'
								/>
							</label>
						</>
					)}
				</Observer>
				<AvatarCutter
					cutterOpened={avatarCutterOpened}
					newAvatar={newAvatarBase64}
					setNewAvatar={setNewAvatarBase64}
					avatar={newAvatar}
					onClose={onClickCloseAvatarCutter}
				/>
			</div>
			<Observer>{() => <NicknameEdit name={userStore.currentName} />}</Observer>
		</div>
	)
}
