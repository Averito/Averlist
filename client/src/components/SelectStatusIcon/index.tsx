import { Status } from '../../api/myApi/anime/types'
import { FC } from 'react'
import {
	CheckCircleOutlined,
	ClearOutlined,
	CloseCircleOutlined,
	FieldTimeOutlined,
	SyncOutlined
} from '@ant-design/icons'

interface SelectStatusIconProps {
	status: Status
}

export const SelectStatusIcon: FC<SelectStatusIconProps> = ({ status }) => {
	if (status === 0) {
		return <CheckCircleOutlined />
	}
	if (status === 1) {
		return <SyncOutlined />
	}
	if (status === 2) {
		return <CloseCircleOutlined />
	}
	if (status === 3) {
		return <FieldTimeOutlined />
	}
	if (status === 4) {
		return <ClearOutlined />
	}
	return <CheckCircleOutlined />
}
