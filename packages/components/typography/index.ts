import Title from './src/title.vue'
import Paragraph from './src/paragraph.vue'
import { withInstall } from '../../utils/install'

export const MyTitle = withInstall(Title)
export const MyParagraph = withInstall(Paragraph)
export default MyTitle
export * from './src/typography'
