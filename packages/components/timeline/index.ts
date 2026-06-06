import Timeline from './src/timeline.vue'
import TimelineItem from './src/timeline-item.vue'
import { withInstall } from '../../utils/install'

export const MyTimeline = withInstall(Timeline)
export const MyTimelineItem = withInstall(TimelineItem)
export default MyTimeline
export * from './src/timeline'
