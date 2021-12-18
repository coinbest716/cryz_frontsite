import React from 'react'

// next components
import Image from 'next/image'

// third part components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// images and icons
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'

// styles
import styles from './MobileClasslandCarousel.module.scss'

const MobileClasslandCarousel = props => {
  const { sliderData } = props
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      stopOnHover={true}
      showStatus={false}
      showIndicators={false}
      infiniteLoop={true}
      centerMode={true}
      centerSlidePercentage={80}
      interval={7500}
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev ? (
          <button onClick={clickHandler} className={styles.previousButton}>
            <Image src={previousButtonPinkIcon} alt="" width={15} height={10} />
          </button>
        ) : (
          <button onClick={clickHandler} className={styles.previousButton}>
            <Image src={previousButtonGrayIcon} alt="" width={15} height={10} />
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext, labelNext) =>
        hasNext ? (
          <button onClick={clickHandler} className={styles.nextButton}>
            <Image onClick={clickHandler} src={nextButtonPinkIcon} alt="" width={15} height={10} />
          </button>
        ) : (
          <button onClick={clickHandler} className={styles.nextButton}>
            <Image onClick={clickHandler} src={nextButtonGrayIcon} alt="" width={15} height={10} />
          </button>
        )
      }
    >
      {sliderData?.map((item, index) => (
        <div key={index} className="mx-1 mb-6">
          <Image src={item.path} alt="" width={1165} height={415} className={styles.slideImage} />
        </div>
      ))}
    </Carousel>
  )
}

export default MobileClasslandCarousel
