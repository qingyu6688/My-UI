import type { InjectionKey, Ref } from 'vue'

export interface BreadcrumbContext {
  separator: Ref<string>
}

export const breadcrumbKey: InjectionKey<BreadcrumbContext> = Symbol('MyBreadcrumb')

export interface BreadcrumbProps {
  separator?: string
}

export interface BreadcrumbItemProps {
  to?: string
  replace?: boolean
}
