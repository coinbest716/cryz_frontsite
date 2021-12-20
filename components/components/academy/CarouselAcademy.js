import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'
import styles from './CarouselAcademy.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import { facebookSignInButton } from 'aws-amplify'

const CarouselAcademy = props => {
  const { sliderData } = props

  if (sliderData?.length > 5) {
    sliderData.splice(5, sliderData.length - 1)
  }

  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      autoPlay={true}
      stopOnHover={true}
      showStatus={false}
      showIndicators={false}
      infiniteLoop={true}
      centerMode={true}
      centerSlidePercentage={100}
      interval={2500}
      renderArrowPrev={() => <></>}
      renderArrowNext={() => <></>}
    >
      {sliderData?.map((item, index) => (
        <div key={index}>
          <Image src={item.path} alt="" width={500} height={350} className={styles.slideImage} />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselAcademy
