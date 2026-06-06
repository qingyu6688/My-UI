import Container from './src/container.vue'
import Header from './src/header.vue'
import Aside from './src/aside.vue'
import Main from './src/main.vue'
import Footer from './src/footer.vue'
import { withInstall } from '../../utils/install'

export const MyContainer = withInstall(Container)
export const MyHeader = withInstall(Header)
export const MyAside = withInstall(Aside)
export const MyMain = withInstall(Main)
export const MyFooter = withInstall(Footer)
export default MyContainer
