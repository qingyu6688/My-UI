import Descriptions from './src/descriptions.vue'
import DescriptionsItem from './src/descriptions-item.vue'
import { withInstall } from '../../utils/install'

export const MyDescriptions = withInstall(Descriptions)
export const MyDescriptionsItem = withInstall(DescriptionsItem)
export default MyDescriptions
export * from './src/descriptions'
