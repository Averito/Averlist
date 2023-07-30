import {
	FC,
	KeyboardEventHandler,
	MouseEventHandler,
	useRef,
	useState
} from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'
import cs from 'classnames'

import styles from './CollectionPageName.module.scss'
import { CollectionPageNameProps } from '@pages/CollectionPage/components/CollectionPageName/CollectionPageName.types'
import { Input } from '@components'
import { useInput } from '@hooks/useInput'
import { useOutside } from '@hooks/useOutside'
import collectionsStore from '@stores/collections.store'
import { errorToast, successToast } from '@helpers/toasts'

export const CollectionPageName: FC<CollectionPageNameProps> = observer(
	({ collectionName, collectionId }) => {
		const isMyCollection = collectionsStore.collections.some(
			collection => collection.id === collectionId
		)

		const [nameEditMode, setNameEditMode] = useState<boolean>(false)
		const [name, setName, initialSetName] = useInput(collectionName)
		const [oldName, setOldName] = useState<string>(collectionName)

		const inputRef = useRef<HTMLInputElement>(null)

		const onSubmit = async () => {
			try {
				if (name === oldName) return setNameEditMode(false)
				if (!name) return errorToast('Имя не должно быть пустым!')

				await collectionsStore.changeNameAsync(collectionId, name)
				setNameEditMode(false)
				setOldName(name)
				successToast('Имя коллекции успешно обновлено!')
			} catch {
				initialSetName(collectionName)
			}
		}

		useOutside(inputRef, () => {
			void onSubmit()
		})

		const onClickEditMode: MouseEventHandler<SVGElement> = event => {
			event.stopPropagation()
			setNameEditMode(true)
		}

		const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
			if (event.code !== 'Enter') return
			void onSubmit()
		}

		return (
			<div
				className={cs(styles.container, {
					[styles.grid]: isMyCollection,
					[styles.block]: !isMyCollection
				})}
			>
				{nameEditMode && isMyCollection ? (
					<Input
						ref={inputRef}
						value={name}
						onChange={setName}
						onKeyDown={onInputKeyDown}
						width='100%'
						placeholder='Имя коллекции'
					/>
				) : (
					<p className={styles.collectionName}>{name}</p>
				)}
				{isMyCollection && (
					<AiFillEdit
						className={styles.editButton}
						onClick={onClickEditMode}
						size={20}
					/>
				)}
			</div>
		)
	}
)
