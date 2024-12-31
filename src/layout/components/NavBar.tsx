import AppLogo from '~/assets/react.svg'
import { Menu, MenuProps } from 'antd'
import { useAtomValue } from 'jotai'
import { bizRoutes, RouteType } from '~/router'
import { permissionsAtom } from '~/store'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HamburgerButton } from '@icon-park/react'

type MenuItem = Required<MenuProps>['items'][number]

const getOpenKeys = (path: string) => {
  let newStr: string = ''
  const newArr = []
  const arr = path.split('/').map(i => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}

const NavBar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const title = import.meta.env.VITE_APP_TITLE
  const permissions = useAtomValue(permissionsAtom)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  const clickMenu = ({ key }: { key: string }) => {
    navigate(key)
  }

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    if (collapsed) {
      setOpenKeys(getOpenKeys(pathname))
    }
  }, [pathname, collapsed])

  useEffect(() => {
    const filterAndConvertMenuByPermissions = (routes: RouteType[], permissions: string[]): MenuItem[] => {
      return routes.flatMap(route => {
        if (route.children) {
          const filteredChildren = filterAndConvertMenuByPermissions(route.children, permissions)
          if (filteredChildren.length > 0 && route.meta?.key) {
            return [
              {
                key: route.meta.key,
                label: route.meta.title,
                icon: route.meta.icon,
                children: filteredChildren
              }
            ]
          }
          return filteredChildren
        }
        if (route.meta?.permission && permissions.includes(route.meta.permission) && !route.meta.hidden) {
          return [
            {
              key: route.meta.key,
              label: route.meta.title,
              icon: route.meta.icon ?? <HamburgerButton theme="outline" size="14" />
            }
          ]
        }
        return []
      })
    }

    const filterMenuList = filterAndConvertMenuByPermissions(bizRoutes, permissions)
    setMenuList(filterMenuList)
  }, [permissions])

  return (
    <>
      <div className="px-10 flex justify-center items-center f-c-c h-56">
        <img src={AppLogo} alt="logo" />
        {collapsed && <span className="ml-8 max-w-120 flex-shrink-0 text-18 color-primary font-bold text-white">{title}</span>}
      </div>
      <div className="flex-1 mt-4 overflow-auto">
        <Menu
          items={menuList}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          triggerSubMenuAction="click"
          inlineIndent={24}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        />
      </div>
    </>
  )
}

export default NavBar
