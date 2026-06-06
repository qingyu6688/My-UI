import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'
import { withInstall } from '../../utils/install'

export const MyDropdown = withInstall(Dropdown)
export const MyDropdownItem = withInstall(DropdownItem)
export default MyDropdown
export * from './src/dropdown'
