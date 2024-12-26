import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'virtual:uno.css'
import Router from './router'
import AuthRouter from './router/helper/authRouter'
import { ConfigProvider, ThemeConfig } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './main.css'
import '@icon-park/react/styles/index.css'
import { App } from 'antd'

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#2f54eb'
  },
  components: {
    Layout: {
      lightSiderBg: '#f5f5f5'
    },
    Menu: {
      itemBg: '#f3f4f4',
      subMenuItemBg: '#f5f5f5',
      itemColor: '#575757',
      itemHoverBg: '#eaeaea',
      popupBg: '#eaeaea',
      itemSelectedBg: '#eaeaea',
      itemSelectedColor: '#0c0c0c',
      itemMarginInline: 10,
      itemHeight: 38,
      itemBorderRadius: 6
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <BrowserRouter>
        <AuthRouter>
          <App className="h-full">
            <Router />
          </App>
        </AuthRouter>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
)
