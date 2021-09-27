import React from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// images
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'

// styles
import styles from 'components/Home/COSlider.module.scss'
import globalStyles from 'styles/GlobalStyle.module.scss'

const COSlider = () => {
  return (
    <div className={globalStyles.container}>
      <div className={styles.title}>&CO</div>
      <div className={styles.divider}></div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay={false}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={false}
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
        {/* first slide */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <img src="/images/01.png" />
            <div className="flex justify-start items-start">
              <div className={styles.divider} />
              <div className={styles.name}>
                Mark <br />
                Andersen
                <div className={styles.role}>CEO</div>
              </div>
            </div>
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
        </div>
        {/* second slide */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
        </div>
        {/* third slide */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
          <div>
            <img src="/images/01.png" />
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default COSlider
