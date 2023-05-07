import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const pathSrc = path.resolve(__dirname, 'src')
const outputPath = (dir) => path.resolve(__dirname, 'dist', dir)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 压缩
    minify: false,
    cssMinify: false,
    // cssCodeSplit: true,
    rollupOptions: {
      // 打包vue文件
      external: ["vue"],
      output: [
        {
          format: "umd",
          entryFileNames: "index.js",
          name: 'index',
          globals: {
            // vue: 'Vue',
          },
          dir: outputPath('')
        },
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true, // 让打包目录和我们目录对应
          dir: outputPath('es'),
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: outputPath('lib'),
        },
      ]
    },
    // 库模式
    lib: {
      entry: "./components/index.ts",
      formats: ['es', 'cjs', 'umd'],
      name: 'MyLib',
      fileName: 'my-lib',
    },
  },











  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "~/styles/element/index.scss" as *;`,
  //     },
  //   },
  // },
  plugins: [
    vue(),
  ],
})

/**
 * 对于css的处理 有两种
 * 1. 全局css，使用全局的方式把css通过规范的命名空间独有化
 *    这种需要把 css 整理成一个单独的css文件管理，这也是目前组件库常用的方式
 * 2. 使用 css scoped或者module 的方式，把css命名空间化
 *    遇到的问题 build 出来的 css 只存在 es 模式下
 *    没有拆出来一个个的css，而是做成了一个整合
 **/
