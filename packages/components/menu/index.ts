import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'
import { withInstall } from '../../utils/install'

export const MyMenu = withInstall(Menu)
export const MyMenuItem = withInstall(MenuItem)
export const MySubMenu = withInstall(SubMenu)
export default MyMenu
export * from './src/menu'
