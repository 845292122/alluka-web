import Login from '~/pages/login'
import { Navigate, useRoutes } from 'react-router-dom'
import React from 'react'

export type RouteMetaType = {
  title: string
  key: string
  requireAuth?: boolean
  permission?: string
  hidden?: boolean
  icon?: React.ReactNode
}

export type RouteType = {
  path?: string
  element?: React.ReactNode
  meta?: RouteMetaType
  children?: RouteType[]
}

// * 导入路由
const metaRoutes = import.meta.glob('./modules/*.tsx', { eager: true })

// * 读取路由到bizRoutes
export const bizRoutes: Array<RouteType> = []
Object.keys(metaRoutes).forEach(item => {
  const routes = metaRoutes[item] as Record<string, unknown>
  if (typeof routes === 'object' && routes !== null) {
    Object.keys(routes).forEach((key: string) => {
      if (Array.isArray(routes[key])) {
        bizRoutes.push(...(routes[key] as RouteType[]))
      }
    })
  }
})

export const routes: RouteType[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
    }
  },
  ...bizRoutes,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const Router = () => useRoutes(routes)

export default Router
