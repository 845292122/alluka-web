import Layout from '~/layout'
import { RouteType } from '..'
import lazyLoad from '../helper/lazyLoad'
import React from 'react'
import { SettingTwo } from '@icon-park/react'

const SystemRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    meta: {
      key: '/system',
      title: '系统管理',
      requireAuth: true,
      permission: 'system',
      icon: <SettingTwo theme="outline" size="16" fill="#ffffff" strokeLinecap="square" />
    },
    children: [
      {
        path: '/system/user',
        element: lazyLoad(React.lazy(() => import('~/pages/system/user'))),
        meta: {
          title: '用户管理',
          key: '/system/user',
          requireAuth: true,
          permission: 'system:user'
        }
      },
      {
        path: '/system/role',
        element: lazyLoad(React.lazy(() => import('~/pages/system/role'))),
        meta: {
          title: '角色管理',
          key: '/system/role',
          requireAuth: true,
          permission: 'system:role'
        }
      },
      {
        path: '/system/tenant',
        element: lazyLoad(React.lazy(() => import('~/pages/system/tenant'))),
        meta: {
          title: '租户管理',
          key: '/system/tenant',
          requireAuth: true,
          permission: 'system:tenant'
        }
      },
      {
        path: '/system/log',
        element: lazyLoad(React.lazy(() => import('~/pages/system/log'))),
        meta: {
          title: '日志管理',
          key: '/system/log',
          requireAuth: true,
          permission: 'system:log'
        }
      }
    ]
  }
]

export default SystemRoutes
