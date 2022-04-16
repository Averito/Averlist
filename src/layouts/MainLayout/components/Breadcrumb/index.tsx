import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb as BreadcrumbAntd } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import { routes } from 'components/Router/routes'
import { decodeAnimeName } from 'helpers/decodeAnimeName'

export const Breadcrumb: FC = () => {
	const location = useLocation()

	return (
		<BreadcrumbAntd>
			<BreadcrumbAntd.Item>
				<Link to='/'>
					<HomeOutlined />
				</Link>
			</BreadcrumbAntd.Item>
			{location.pathname
				.split('/')
				.filter(path => path !== '')
				.map(path => {
					const decodedPath = decodeURI(path)
					const toHref =
						routes.find(route => route.route.slice(1) === path)?.route || '/'
					const routeName = routes.find(route => route.route.slice(1) === path)
						?.name as string
					const BreadcrumbName =
						routeName ||
						`${decodedPath[0].toUpperCase()}${decodedPath.slice(1)}`
					return (
						<BreadcrumbAntd.Item key={path}>
							<Link to={toHref}>{decodeAnimeName(BreadcrumbName)}</Link>
						</BreadcrumbAntd.Item>
					)
				})}
		</BreadcrumbAntd>
	)
}