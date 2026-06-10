import VirtualizedSelect from './src/virtualized-select.vue'
import { withInstall } from '../../utils/install'

export const MyVirtualizedSelect = withInstall(VirtualizedSelect)
export type { VirtualizedSelectOption } from './src/virtualized-select'
export default MyVirtualizedSelect
