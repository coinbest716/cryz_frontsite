import React, { useEffect, useState } from 'react'
// next component
import Image from 'next/image'

// third party component
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

// images
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'

// styles
import styles from './CarouselFemaleHealth.module.scss'

const CarouselFemaleHealth = props => {
  const { sliderData } = props

  const [data, setData] = useState([])

  useEffect(() => {
    if (sliderData.length > 5) {
      let array = sliderData.splice(5, sliderData.length - 1)
      setData(array)
    } else {
      setData(sliderData)
    }
  }, [sliderData])

  return (
    <div className={'relative w-full h-full'}>
      <div className={'absolute top-0 left-0 w-full femaleCarousel'}>
        <div className={'absolute top-0 left-0 bottom-0 h-full w-1/12 z-10 bg-white'}></div>
        {data.length !== 0 ? (
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            stopOnHover={true}
            showStatus={false}
            showIndicators={true}
            infiniteLoop={true}
            centerMode={true}
            centerSlidePercentage={84}
            interval={2500}
            renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
              hasPrev ? (
                <button onClick={clickHandler} className={styles.previousButton}>
                  <Image src={previousButtonGrayIcon} alt="" width={20} height={15} />
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
                  <Image onClick={clickHandler} src={nextButtonGrayIcon} alt="" width={20} height={15} />
                </button>
              ) : (
                <button onClick={clickHandler} className={styles.nextButton}>
                  <Image onClick={clickHandler} src={nextButtonGrayIcon} alt="" width={20} height={15} />
                </button>
              )
            }
          >
            {data.map((item, index) => (
              <div key={index} className={'pb-12 px-5'}>
                <Image
                  src={item.image}
                  alt=""
                  width={379}
                  height={index % 2 === 0 ? 379 : 474}
                  layout="responsive"
                  objectFit="cover"
                  className={index % 2 === 0 ? styles.circleImage : ''}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default CarouselFemaleHealth
