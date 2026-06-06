import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'
import { withInstall } from '../../utils/install'

export const MyCollapse = withInstall(Collapse)
export const MyCollapseItem = withInstall(CollapseItem)
export default MyCollapse
export * from './src/collapse'
