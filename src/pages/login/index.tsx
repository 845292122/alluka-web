import { Button, Checkbox, Divider, Form, Input } from 'antd'

// type LoginField = {
//   username: string
//   passowrd: string
// }

// TODO: 验证码

const LoginForm = () => {
  return (
    <div className="min-w-350">
      <h1>欢迎使用</h1>
      <Form name="login" autoComplete="off">
        <Form.Item name="uesrname" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" className="mb-0">
          <Checkbox>保持登录</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider plain>联系作者</Divider>
      {/* TODO: 联系作者 */}
      <div className="flex justify-around">
        <i className="i-ant-design:wechat-filled w-30 h-30 color-green" />
        <i className="i-ant-design:phone-filled w-30 h-30 color-green" />
      </div>
    </div>
  )
}

const Login = () => {
  // TODO: 有token，返回首页

  return (
    <div className="wh-full flex">
      <div className="flex-2 bg-#f9fafd"></div>
      <div className="flex-1 bg-#f5f5f5 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
