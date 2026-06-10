import VirtualizedTable from './src/virtualized-table.vue'
import { withInstall } from '../../utils/install'

export const MyVirtualizedTable = withInstall(VirtualizedTable)
export type { VirtualizedTableColumn } from './src/virtualized-table'
export default MyVirtualizedTable
