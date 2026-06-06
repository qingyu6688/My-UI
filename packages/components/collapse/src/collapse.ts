import type { InjectionKey, Ref } from 'vue'

export type CollapseName = string | number
export type CollapseModelValue = CollapseName | CollapseName[]

export interface CollapseContext {
  activeNames: Ref<CollapseName[]>
  accordion: Ref<boolean>
  toggle: (name: CollapseName) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('MyCollapse')

export interface CollapseProps {
  modelValue?: CollapseModelValue
  accordion?: boolean
}

export interface CollapseEmits {
  'update:modelValue': [value: CollapseModelValue]
  change: [value: CollapseModelValue]
}

export interface CollapseItemProps {
  name: CollapseName
  title?: string
  disabled?: boolean
}
