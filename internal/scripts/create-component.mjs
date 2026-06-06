import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [, , rawName] = process.argv

if (!rawName) {
  throw new Error('请传入组件名，例如：node internal/scripts/create-component.mjs alert')
}

const componentName = rawName.trim().toLowerCase()
const componentDir = resolve(process.cwd(), 'packages/components', componentName)

await mkdir(resolve(componentDir, 'src'), { recursive: true })
await mkdir(resolve(componentDir, '__tests__'), { recursive: true })

await writeFile(
  resolve(componentDir, 'index.ts'),
  `export { default as My${toPascalCase(componentName)} } from './src/${componentName}.vue'\n`,
)

await writeFile(
  resolve(componentDir, 'src', `${componentName}.vue`),
  `<script setup lang="ts">\ndefineOptions({ name: 'My${toPascalCase(componentName)}' })\n</script>\n\n<template>\n  <div class="my-${componentName}" />\n</template>\n`,
)

function toPascalCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('')
}

