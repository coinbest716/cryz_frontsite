import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// third party components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// custom components
import ClassDoubleCard from './ClassDoubleCard'

// images
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'

// styles
import styles from './MobileDoubleClasslandCarousel.module.scss'

const MobileDoubleClasslandCarousel = props => {
  const { coTeam } = props
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    let arr = []
    coTeam.map(item => {
      if (item.visible === true) {
        arr.push(item)
      }
    })
    var size = 2
    var arrayOfArrays = []
    for (var i = 0; i < arr.length; i += size) {
      arrayOfArrays.push(arr.slice(i, i + size))
    }
    setSliderData(arrayOfArrays)
  }, [coTeam])

  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay={false}
        stopOnHover={true}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={80}
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
        {sliderData.map((item, index) => (
          <div key={index} className="mx-1 mb-10">
            {item.map((cardData, index) => (
              <ClassDoubleCard data={cardData} key={index} />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MobileDoubleClasslandCarousel
