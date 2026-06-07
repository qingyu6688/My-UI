import type { InjectionKey } from 'vue'

export type TreeKey = string | number

export interface TreeNodeData {
  label: string
  key?: TreeKey
  disabled?: boolean
  children?: TreeNodeData[]
  [prop: string]: unknown
}

export interface TreeContext {
  expandedKeys: Set<TreeKey>
  checkedKeys: Set<TreeKey>
  selectedKey: TreeKey | undefined
  showCheckbox: boolean
  isExpanded: (key: TreeKey) => boolean
  isChecked: (key: TreeKey) => boolean
  isSelected: (key: TreeKey) => boolean
  toggleExpand: (key: TreeKey) => void
  toggleCheck: (node: TreeNodeData) => void
  selectNode: (node: TreeNodeData) => void
  getKey: (node: TreeNodeData) => TreeKey
}

export const treeContextKey: InjectionKey<TreeContext> = Symbol('MyTree')

export interface TreeProps {
  data: TreeNodeData[]
  nodeKey?: string
  showCheckbox?: boolean
  defaultExpandedKeys?: TreeKey[]
  defaultCheckedKeys?: TreeKey[]
  defaultExpandAll?: boolean
}

export interface TreeEmits {
  nodeClick: [node: TreeNodeData]
  check: [checkedKeys: TreeKey[]]
  expand: [expandedKeys: TreeKey[]]
}
