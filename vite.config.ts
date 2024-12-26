import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  const env = loadEnv(config.mode, process.cwd())
  const isBuild = config.command === 'build'
  return {
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.app.com/admin/，则设置 baseUrl 为 /admin/。
    base: env.VITE_APP_CONTEXT_PATH,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    plugins: [
      UnoCSS(),
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      }),
      isBuild &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz'
        })
    ],
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    build: {
      target: 'es2015',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024 // chunk 大小警告的限制（单位kb）
    }
  }
})
