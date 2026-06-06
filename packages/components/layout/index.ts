import Row from './src/row.vue'
import Col from './src/col.vue'
import { withInstall } from '../../utils/install'

export const MyRow = withInstall(Row)
export const MyCol = withInstall(Col)
export default MyRow
export * from './src/layout'
