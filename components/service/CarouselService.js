import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'
import styles from './CarouselService.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

const CarouselService = props => {
  const { sliderData, viewport, type } = props
  if (sliderData.length > 5) {
    sliderData.splice(5, sliderData.length - 1)
  }

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      stopOnHover={true}
      showStatus={false}
      showIndicators={true}
      // infiniteLoop={true}
      centerMode={true}
      centerSlidePercentage={100}
      interval={2500}
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev ? (
          <button onClick={clickHandler} className={styles.previousButton}>
            <Image src={previousButtonPinkIcon} alt="" width={20} height={15} />
          </button>
        ) : (
          <button onClick={clickHandler} className={styles.previousButton}>
            <Image src={previousButtonGrayIcon} alt="" width={20} height={15} />
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext, labelNext) =>
        hasNext ? (
          <button onClick={clickHandler} className={styles.nextButton}>
            <Image onClick={clickHandler} src={nextButtonPinkIcon} alt="" width={20} height={15} />
          </button>
        ) : (
          <button onClick={clickHandler} className={styles.nextButton}>
            <Image onClick={clickHandler} src={nextButtonGrayIcon} alt="" width={20} height={15} />
          </button>
        )
      }
    >
      {sliderData?.map((item, index) =>
        viewport === 'mobile' ? (
          <div key={index} style={{ height: '250px' }}>
            <Image
              src={item.path}
              alt=""
              width={200}
              height={200}
              className={type === 'news' ? styles.slideImageRect : styles.slideImage}
            />
          </div>
        ) : (
          <div key={index} style={{ height: '550px' }}>
            <Image
              src={item.path}
              alt=""
              width={500}
              height={500}
              className={type === 'news' ? styles.slideImageRect : styles.slideImage}
            />
          </div>
        )
      )}
    </Carousel>
  )
}

export default CarouselService
