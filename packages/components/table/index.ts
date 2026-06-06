import Table from './src/table.vue'
import TableColumn from './src/table-column.vue'
import { withInstall } from '../../utils/install'

export const MyTable = withInstall(Table)
export const MyTableColumn = withInstall(TableColumn)
export default MyTable
export * from './src/table'
