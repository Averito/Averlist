import React, { FC } from 'react'
import { Button, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'
import defaultAvatar from 'assets/icons/defaultAvatar.png'
import { setAvatarThunk } from 'store/reducers/userReducer/userThunks'
import { MY_AVATAR_URI } from 'variebles'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { ProfileForm } from './components/ProfileForm'

export const Profile: FC = () => {
	const dispatch = useAppDispatch()
	const { avatar, login } = useAppSelector(state => state.user)

	const onChangeSelectPhoto = (
		avatar: string | boolean | void | File | Blob
	) => {
		dispatch(setAvatarThunk(avatar as File))
	}

	const currentAvatar = avatar ? `${MY_AVATAR_URI}${avatar}` : defaultAvatar
	return (
		<div className={styles.profile}>
			<div className={styles.profileItem1}>
				<ProfileForm />
			</div>
			<div className={styles.profileItem2}>
				<img
					className={styles.profileItem2Avatar}
					src={currentAvatar}
					alt={login}
				/>
				<ImgCrop shape='round' onModalOk={onChangeSelectPhoto}>
					<Upload fileList={[]}>
						<Button icon={<UploadOutlined />}>Выбрать фото</Button>
					</Upload>
				</ImgCrop>
			</div>
		</div>
	)
}
