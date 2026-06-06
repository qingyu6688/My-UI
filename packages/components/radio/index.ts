import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'
import { withInstall } from '../../utils/install'

export const MyRadio = withInstall(Radio)
export const MyRadioGroup = withInstall(RadioGroup)
export default MyRadio
export * from './src/radio'
