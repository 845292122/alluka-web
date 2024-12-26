# ALLUKA WEB

## TODO

## 组件规范

```tsx
// 常量定义
const column = []

// 变量区域
const [count, setCount] = useState()

// 请求区域
useEffect(() => {
  const fetchData = async () => {}
  fetchData()
}, [])

// 方法区域
const handleClick = () => {}

// 非请求effect区域
useEffect(() => {}, [])

// 渲染
return ()
```

## Docker部署

1. docker build -t react-admin:v0 .
2. 导出镜像: docker save -o react-admin.tar(导出文件名) react-admin:v0(镜像名)
3. 上传镜像文件到服务器后加载: docker load -i react-admin.tar
4. 启动容器: docker run --name react-admin -dp 1234:80 react-admin:v0
