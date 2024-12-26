import { DropDownList, Logout, MenuFoldOne, MenuUnfoldOne, PersonalPrivacy } from '@icon-park/react'
import { Avatar, Button, Dropdown, MenuProps, Typography } from 'antd'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { useRouteMeta } from '~/hooks/useRouteMeta'
import { navCollapsedAtom } from '~/store/app.store'

// * 个人信息
const Profile = () => {
  const naviate = useNavigate()
  const toProfile = () => {
    naviate('/profile')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人信息',
      icon: <PersonalPrivacy theme="outline" size="16" fill="#381c1c" strokeLinecap="square" />,
      onClick: toProfile
    },
    {
      key: '4',
      icon: <Logout theme="outline" size="16" fill="#381c1c" strokeLinecap="square" />,
      label: '注销登录'
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="top" trigger={['click']}>
      <div className="flex cursor-pointer items-center hover:bg-gray-200/50 border-rd-3xl py-5 pr-10 mr-10">
        <Avatar shape="square" className="ml-10" />
        <span className="text-14 ml-10 mr-5">超级管理员</span>
        <DropDownList theme="outline" size="16" fill="#381c1c" strokeWidth={3} strokeLinecap="square" />
      </div>
    </Dropdown>
  )
}

const AppHeader = () => {
  const [collapseMenu, setCollapseMenu] = useAtom(navCollapsedAtom)
  const routeMeta = useRouteMeta()

  const toggleCollapseMenu = () => {
    setCollapseMenu(!collapseMenu)
  }

  return (
    <div className="h-56 flex justify-between w-full items-center" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex items-center">
        <Button
          type="text"
          className="ml-10"
          icon={
            collapseMenu ? (
              <MenuUnfoldOne theme="outline" size="20" fill="#020202" strokeWidth={3} strokeLinecap="square" />
            ) : (
              <MenuFoldOne theme="outline" size="20" fill="#020202" strokeWidth={3} strokeLinecap="square" />
            )
          }
          onClick={toggleCollapseMenu}
        />
        <div className="border-rd-lg h-20 w-4 mr-5 ml-10 bg-#1d1db7" />
        <Typography.Text>{routeMeta.title}</Typography.Text>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  )
}

export default AppHeader
