import { Navigate, useLocation } from 'react-router-dom'
import { routes, RouteType } from '..'
import { useAtomValue } from 'jotai'
import { permissionsAtom, tokenAtom } from '~/store/auth.store'

export function findRoute(pathname: string, routes: Array<RouteType> = []): RouteType {
  let result: RouteType = {}
  for (const route of routes) {
    if (route.path === pathname) return route
    if (route.children) {
      const res = findRoute(pathname, route.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * * 路由守卫 (授权认证校验)
 */
const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const token = useAtomValue(tokenAtom)
  const permissions = useAtomValue(permissionsAtom)

  // * 找到当前路由的 meta 信息
  const { pathname } = useLocation()
  const route = findRoute(pathname, routes)

  // * 不需要认证,直接放行
  if (!route.meta?.requireAuth) return children

  // * 需要认证才能访问
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // * 需要有权限才能访问
  if (route.meta.permission && !permissions?.includes(route.meta.permission)) {
    return <Navigate to="/403" />
  }

  return children
}

export default AuthRouter
