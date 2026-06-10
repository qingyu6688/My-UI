export interface VirtualizedTreeNode {
  key: string | number
  label: string
  children?: VirtualizedTreeNode[]
}
