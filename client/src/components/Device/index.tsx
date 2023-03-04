import { FC, ReactNode } from 'react'
import * as rdd from 'react-device-detect'

interface DeviceProps {
	children: (props: typeof rdd) => ReactNode
}
const Device: FC<DeviceProps> = ({ children }) => {
	return <div className='device'>{children(rdd)}</div>
}

export default Device
