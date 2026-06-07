import type { TreeKey, TreeNodeData } from '../../tree'

export interface TreeSelectProps {
  modelValue?: TreeKey
  data: TreeNodeData[]
  nodeKey?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  defaultExpandAll?: boolean
  size?: 'small' | 'default' | 'large'
}

export interface TreeSelectEmits {
  'update:modelValue': [value: TreeKey | undefined]
  change: [value: TreeKey | undefined]
}
