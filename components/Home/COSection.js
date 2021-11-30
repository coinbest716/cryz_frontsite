import React, { useEffect, useState } from 'react'

// next components
import Image from 'next/image'

// third party components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'
import smileIcon from 'assets/images/smile.svg'

// styles
import styles from 'components/Home/COSection.module.scss'
import globalStyles from 'styles/GlobalStyles.module.scss'

const COSection = props => {
  const { coTeam } = props
  const [sliderData, setSliderData] = useState([])
  const [isFlipped, setIsFlipped] = useState({ id: 1, bool: false })

  useEffect(() => {
    var size = 6
    var arrayOfArrays = []
    for (var i = 0; i < coTeam.length; i += size) {
      arrayOfArrays.push(coTeam.slice(i, i + size))
    }
    setSliderData(arrayOfArrays)
  }, [coTeam])

  const handleSetIsFlipped = (bool, id) => {
    setIsFlipped(isFlipped => ({ ...isFlipped, id: id }))
    setIsFlipped(isFlipped => ({ ...isFlipped, bool: bool }))
  }
  return (
    <div className={globalStyles.container}>
      <div className={styles.title}>&CO</div>
      <div className={styles.divider}></div>
      <div className={styles.carouselArea}>
        {sliderData.length !== 0 ? (
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={false}
            stopOnHover={true}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
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
              <div key={index} className={'grid grid-cols-3 gap-4'}>
                {item.map((elem, idx) => (
                  <div key={idx}>
                    <div
                      onMouseOver={() => handleSetIsFlipped(true, elem.id)}
                      onMouseLeave={() => handleSetIsFlipped(false, elem.id)}
                    >
                      {elem.id === isFlipped.id && isFlipped.bool === true ? (
                        <div className={styles.card}>
                          {/* <div>{elem.avatar}</div> */}
                          <Image
                            src={elem.avatar !== '' ? elem.avatar : smileIcon}
                            alt=""
                            width={364}
                            height={364}
                            layout="responsive"
                          />
                          <div className={styles.cardContent}>
                            <div>
                              <div className={'w-full inline-block text-center ' + styles.cardText}>
                                {elem.speicalty}
                              </div>
                              <div className={'w-full inline-block ' + styles.cardName}>
                                {elem.name} {elem.lastname}
                              </div>
                              <div className={'w-full inline-block ' + styles.cardDescription}>{elem.degree}</div>
                            </div>
                            <div className={'w-full flex justify-center'}>
                              <SocialButtonGroup
                                color="gray"
                                socialURL={{ instagram: elem.instragram, facebook: elem.facebook }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.card}>
                          <Image
                            src={elem.avatar !== '' ? elem.avatar : smileIcon}
                            alt=""
                            width={364}
                            height={364}
                            layout="responsive"
                          />
                        </div>
                      )}
                    </div>
                    <div className={'flex justify-start items-start'}>
                      <div className={styles.divider} />
                      <div className={styles.name}>
                        {elem.name}
                        <br />
                        {elem.lastname}
                        <div className={styles.specialty}>{elem.speicalty}</div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default COSection
