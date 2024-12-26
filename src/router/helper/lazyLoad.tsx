import { Spin } from 'antd'
import { Suspense } from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

export default lazyLoad
