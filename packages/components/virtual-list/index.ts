import VirtualList from './src/virtual-list.vue'
import { withInstall } from '../../utils/install'

export const MyVirtualList = withInstall(VirtualList)
export default MyVirtualList
export * from './src/virtual-list'
