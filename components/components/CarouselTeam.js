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
import styles from './CarouselTeam.module.scss'

const CarouselTeam = props => {
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
      centerSlidePercentage={100}
      interval={7500}
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
      {sliderData?.map((item, index) => (
        <div key={index}>
          <Image src={item.image} alt="" width={1165} height={415} className={styles.slideImage} />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselTeam
