import Carousel from './src/carousel.vue'
import CarouselItem from './src/carousel-item.vue'
import { withInstall } from '../../utils/install'

export const MyCarousel = withInstall(Carousel)
export const MyCarouselItem = withInstall(CarouselItem)
export default MyCarousel
export * from './src/carousel'
