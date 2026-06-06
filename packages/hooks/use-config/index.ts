import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import { zhCn } from '../../locale'

export type Language = typeof zhCn
export type ComponentSize = 'small' | 'default' | 'large'

export interface ConfigProviderContext {
  namespace: string
  size: ComponentSize
  zIndex: number
  locale: Language
}

export interface ConfigProviderProps {
  namespace?: string
  size?: ComponentSize
  zIndex?: number
  locale?: Language
}

export const configProviderKey: InjectionKey<ComputedRef<ConfigProviderContext>> =
  Symbol('MyConfigProvider')

export const defaultConfig: ConfigProviderContext = {
  namespace: 'my',
  size: 'default',
  zIndex: 2000,
  locale: zhCn,
}

let zIndexSeed = 0

/** 读取全局配置（无 ConfigProvider 时退回默认值） */
export function useConfig(): ComputedRef<ConfigProviderContext> {
  return inject(
    configProviderKey,
    computed(() => defaultConfig),
  )
}

/** 提供配置上下文，合并父级配置 */
export function provideConfig(props: ConfigProviderProps): ComputedRef<ConfigProviderContext> {
  const parent = useConfig()

  const merged = computed<ConfigProviderContext>(() => ({
    namespace: props.namespace ?? parent.value.namespace,
    size: props.size ?? parent.value.size,
    zIndex: props.zIndex ?? parent.value.zIndex,
    locale: props.locale ?? parent.value.locale,
  }))

  provide(configProviderKey, merged)
  return merged
}

/** 读取全局默认尺寸 */
export function useGlobalSize(): ComputedRef<ComponentSize> {
  const config = useConfig()
  return computed(() => config.value.size)
}

/** 读取当前语言包 */
export function useLocale(): ComputedRef<Language> {
  const config = useConfig()
  return computed(() => config.value.locale)
}

/** 生成递增且不低于全局基准的 z-index */
export function useZIndex(): { nextZIndex: () => number; currentZIndex: ComputedRef<number> } {
  const config = useConfig()
  const currentZIndex = computed(() => config.value.zIndex + zIndexSeed)
  const nextZIndex = (): number => {
    zIndexSeed += 1
    return config.value.zIndex + zIndexSeed
  }
  return { nextZIndex, currentZIndex }
}
