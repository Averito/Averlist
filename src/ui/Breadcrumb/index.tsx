import { FC } from 'react'
import { Breadcrumb, BreadcrumbProps } from 'antd'
import classnames from 'classnames'

import styles from './styles.module.scss'

interface UIBreadcrumbProps {
	children: any
}

export const UIBreadcrumb: FC<UIBreadcrumbProps & BreadcrumbProps> = ({
	children,
	className
}) => {
	return (
		<Breadcrumb className={classnames(styles.breadcrumb, className)}>
			{children}
		</Breadcrumb>
	)
}
