import {
	FC,
	MouseEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import { observer } from 'mobx-react-lite'
import { MdEdit } from 'react-icons/md'

import styles from './NicknameEdit.module.scss'
import { Flex } from '@components/Flex'
import { Input } from '@components/Input'
import { useInput } from '@hooks/useInput'
import { useOutside } from '@hooks/useOutside'
import { averlist } from '@averlistApi/averlist'
import userStore from '@stores/user.store'

interface NicknameEditProps {
	name: string
}

export const NicknameEdit: FC<NicknameEditProps> = observer(({ name }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [nickname, setNickname, setNicknameStandard] = useInput(name)

	const onClickEdit: MouseEventHandler<SVGAElement> = event => {
		event.stopPropagation()
		setNicknameStandard(name)
		setIsEdit(true)
	}

	const saveNickname = useCallback(async () => {
		if (nickname === name) return
		const user = await averlist.users.editName(nickname)
		userStore.setCurrentName(user.name)
	}, [nickname, name])

	const nicknameEdit = useRef<HTMLDivElement>(null)
	useOutside(nicknameEdit, async () => {
		if (!isEdit) return
		await saveNickname()
		setIsEdit(false)
	})

	useEffect(() => {
		const onKeyDown = async (event: KeyboardEvent) => {
			if (event.code !== 'Enter') return
			await saveNickname()
			setIsEdit(false)
		}
		document.body.addEventListener('keydown', onKeyDown)
		return () => document.body.removeEventListener('keydown', onKeyDown)
	}, [saveNickname])

	return (
		<Flex ref={nicknameEdit} alignItems='center' margin='10px 0 0 0'>
			{isEdit ? (
				<Input value={nickname} width='100%' onChange={setNickname} />
			) : (
				<>
					<p className={styles.nickname}>{name}</p>
					<MdEdit size={16} cursor='pointer' onClick={onClickEdit} />
				</>
			)}
		</Flex>
	)
})
