import { theme } from 'antd'

export default function IconWrapper({
  children,
  color,
  shape
}: {
  children: JSX.Element
  color?: string
  shape?: 'circle' | 'square'
}) {
  const { token } = theme.useToken()
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-3xl'

  return (
    <div
      className={`flex justify-center items-center pa-5 mr-10 text-white w-26 h-26 inline ${shapeClass}`}
      style={{
        backgroundColor: color ?? token.colorPrimary
      }}
    >
      {children}
    </div>
  )
}
