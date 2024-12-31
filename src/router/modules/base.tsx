import Layout from '~/layout'
import Home from '~/pages/home'
import { RouteType } from '..'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'
import { System } from '@icon-park/react'
import IconWrapper from '~/components/IconWrapper'

const BaseRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: {
          title: '首页',
          key: '/',
          requireAuth: true,
          permission: 'home',
          icon: (
            <IconWrapper>
              <System theme="outline" size="14" fill="#ffffff" strokeLinecap="square" />
            </IconWrapper>
          )
        }
      }
    ]
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/profile',
        element: lazyLoad(React.lazy(() => import('~/pages/profile'))),
        meta: {
          title: '个人信息',
          key: 'profile',
          requireAuth: true,
          hidden: true
        }
      }
    ]
  }
]

export default BaseRoutes
