import { useLocation } from 'react-router-dom'
import { bizRoutes, RouteMetaType } from '~/router'
import { findRoute } from '~/router/helper/authRouter'

export const useRouteMeta = (): RouteMetaType => {
  const { pathname } = useLocation()
  const route = findRoute(pathname, bizRoutes)
  const defaultMeta: RouteMetaType = {
    title: '',
    key: ''
  }
  return route?.meta || defaultMeta
}
