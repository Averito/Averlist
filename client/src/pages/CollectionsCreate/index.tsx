import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import { MdModeEditOutline } from 'react-icons/md'

import styles from './CollectionsCreate.module.scss'
import { Flex } from '@components/Flex'
import Image from 'next/image'
import { Input } from '@components/Input'
import { useInput } from '@hooks/useInput'
import { Select, SelectMenu } from '@components/Select'
import { Averlist } from '@averlistApi/types'
import { collectionTypeOptions } from '@pages/CollectionsCreate/CollectionsCreate.data'
import { Button } from '@components/Button'
import { CollectionsCreateSelectAnime } from '@pages/CollectionsCreate/components/CollectionsCreateSelectAnime'
import collectionsStore from '@stores/collections.store'
import { errorToast } from '@helpers/toasts'

export const CollectionsCreate: FC = () => {
	const router = useRouter()

	const [image, setImage] = useState<string>()
	const [sourceImageFile, setSourceImageFile] = useState<File | null>(null)
	const onChangeImage: ChangeEventHandler<HTMLInputElement> = event => {
		const file = event.currentTarget.files?.item(0)
		if (!file) return

		setSourceImageFile(file)

		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)

		fileReader.addEventListener('loadend', () => {
			setImage(fileReader.result as string)
		})
	}

	const [collectionType, setCollectionType] = useState<
		SelectMenu<Averlist.CollectionType>
	>(collectionTypeOptions[0])
	const onSelectCollectionType = (
		item: SelectMenu<Averlist.CollectionType>
	) => {
		return () => {
			setCollectionType(item)
		}
	}

	const [name, setName] = useInput('')

	const [showSelectAnime, setShowSelectAnime] = useState<boolean>(false)
	const onClickSelectAnime: MouseEventHandler<HTMLButtonElement> = () => {
		setShowSelectAnime(prevState => !prevState)
	}

	const [selectedAnime, setSelectedAnime] = useState<string[]>([])

	const onCreateCollection: MouseEventHandler<HTMLButtonElement> = async () => {
		if (!sourceImageFile) {
			return errorToast('Необходимо выбрать картинку')
		}

		await collectionsStore
			.createCollection({
				poster: sourceImageFile,
				name,
				type: collectionType.value,
				anime_list: selectedAnime.join(',')
			})
			.then(() => router.push('/lk/collections'))
	}

	return (
		<Flex justifyContent='center'>
			<div className={styles.mainContainer}>
				<Flex
					className={styles.imageContainer}
					alignItems='center'
					justifyContent='center'
				>
					<label className={styles.imageLabel} htmlFor='collection-image'>
						{image ? (
							<>
								<div className={styles.imageChangeOverlay}>
									<MdModeEditOutline size={16} color='#fff' />
									Изменить
								</div>
								<Image
									className={styles.image}
									src={image}
									alt='Постер'
									layout='fill'
								/>
							</>
						) : (
							<p>Нажмите чтобы выбрать картинку</p>
						)}
						<input
							className={styles.filePickerDisplayNone}
							id='collection-image'
							type='file'
							multiple={false}
							onChange={onChangeImage}
						/>
					</label>
				</Flex>
				<div>
					<Input
						label='Название коллекции'
						onChange={setName}
						value={name}
						margin='15px 0'
						width='100%'
					/>
					<Select
						onChange={onSelectCollectionType}
						currentOption={collectionType}
						options={collectionTypeOptions}
						label='Тип коллекции'
						margin='15px 0'
						width='100%'
					/>
					<Flex width='100%' justifyContent='space-between'>
						<Button width='48%' onClick={onClickSelectAnime}>
							Выбрать аниме
						</Button>
						<Button width='48%' onClick={onCreateCollection}>
							Создать коллекцию
						</Button>
					</Flex>
					<CollectionsCreateSelectAnime
						onChange={setSelectedAnime}
						active={showSelectAnime}
					/>
				</div>
			</div>
		</Flex>
	)
}
