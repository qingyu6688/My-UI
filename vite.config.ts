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
      },
    },
    build: isLib
      ? {
          outDir: 'packages/my-ui/dist',
          emptyOutDir: true,
          cssCodeSplit: false,
          lib: {
            entry: resolve(__dirname, 'packages/my-ui/index.ts'),
            name: 'MyUI',
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
            cssFileName: 'theme-chalk/index',
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              exports: 'named',
              globals: {
                vue: 'Vue',
              },
            },
          },
        }
      : undefined,
  }
})
