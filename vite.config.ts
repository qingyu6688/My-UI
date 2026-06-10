import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@my-ui': resolve(__dirname, 'packages'),
        ...(isLib ? {} : { vue: 'vue/dist/vue.esm-bundler.js' }),
      },
    },
    build: isLib
      ? {
          outDir: 'packages/my-ui/dist',
          emptyOutDir: true,
          cssCodeSplit: false,
          lib: {
            entry: {
              index: resolve(__dirname, 'packages/my-ui/index.ts'),
              full: resolve(__dirname, 'packages/my-ui/full.ts'),
            },
            formats: ['es', 'cjs'],
            fileName: (format, name) => (format === 'es' ? `${name}.mjs` : `${name}.cjs`),
            cssFileName: 'theme-chalk/index',
          },
          rollupOptions: {
            external: ['vue', 'lucide-vue-next'],
            output: {
              exports: 'named',
              globals: { vue: 'Vue' },
              // 关键：保留每个组件为独立 chunk，消费侧 rollup 才能真正 tree-shake
              preserveModules: true,
              preserveModulesRoot: 'packages',
            },
          },
        }
      : undefined,
  }
})
