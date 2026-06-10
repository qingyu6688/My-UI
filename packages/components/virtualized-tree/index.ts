import VirtualizedTree from './src/virtualized-tree.vue'
import { withInstall } from '../../utils/install'

export const MyVirtualizedTree = withInstall(VirtualizedTree)
export type { VirtualizedTreeNode } from './src/virtualized-tree'
export default MyVirtualizedTree
