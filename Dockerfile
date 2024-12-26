## 第一阶段: node镜像打包
FROM node:latest AS fe-build
WORKDIR /fe-app
COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g npm@latest
RUN npm install
RUN npm run build

## 第二阶段: nginx打包
FROM nginx:latest
EXPOSE 80
WORKDIR /app
# 替换nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 将静态文件复制到nginx中
RUN rm -rf /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html
COPY --from=fe-build /fe-app/dist /usr/share/nginx/html

## 运行
CMD [ "nginx", "-g", "daemon off;" ]
