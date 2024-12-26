import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useAtomValue } from 'jotai'
import { navCollapsedAtom } from '~/store/app.store'
import AppHeader from './components/Header'
import { Layout } from 'antd'

const AppLayout = () => {
  const { Sider, Content } = Layout
  const navCollapsed = useAtomValue(navCollapsedAtom)

  return (
    <Layout className="flex wh-full">
      <Sider collapsed={!navCollapsed} width={220}>
        <NavBar collapsed={navCollapsed} />
      </Sider>
      <Layout>
        <AppHeader />
        <Content className="p-20">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
