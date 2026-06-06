import Breadcrumb from './src/breadcrumb.vue'
import BreadcrumbItem from './src/breadcrumb-item.vue'
import { withInstall } from '../../utils/install'

export const MyBreadcrumb = withInstall(Breadcrumb)
export const MyBreadcrumbItem = withInstall(BreadcrumbItem)
export default MyBreadcrumb
export * from './src/breadcrumb'
