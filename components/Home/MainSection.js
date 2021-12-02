import React from 'react'

// next components
import Image from 'next/image'
import router from 'next/router'

// components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'

// images
import MainImage from 'assets/images/main.png'
import ArrowLeftWhite from 'assets/images/arrow-left-white.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/Home/MainSection.module.scss'

const MainSection = props => {
  const { mainImage, featuredServices } = props
  return (
    <div className={'w-full p-0 relative'}>
      <div className={'relative w-full p-0 m-0 h-screen -z-10'}>
        {mainImage !== '' ? (
          <Image
            src={mainImage.path ? mainImage.path : MainImage}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        ) : (
          <></>
        )}
      </div>
      <div id="topToBottom" className={styles.topToBottom}>
        {mainImage.text_two}
      </div>
      <div id="bottomToTop" className={styles.bottomToTop}>
        {mainImage.text_one}
      </div>
      <div className={'absolute flex justify-end w-1/3 top-0 right-0 p-0 m-0 h-screen ' + styles.mainRightArea}>
        <div className={'absolute top-0 left-0 h-screen -z-10 w-full ' + styles.mainCarouselOpacityArea} />
        <div className={'mainCarouselArea'}>
          <Carousel
            showArrows={false}
            showThumbs={false}
            autoPlay={true}
            stopOnHover={true}
            showStatus={false}
            showIndicators={true}
            infiniteLoop={true}
            interval={5000}
            axis="vertical"
            dynamicHeight={true}
          >
            {featuredServices &&
              featuredServices.map((item, index) => (
                <div key={index}>
                  {index % 2 === 0 ? (
                    <>
                      {/* {item.type === 'image' ? ( */}
                      <div className={styles.imageArea}>
                        <Image
                          src={item.image !== null ? item.image : MainImage}
                          alt=""
                          width={345}
                          height={194}
                          layout="responsive"
                        />
                      </div>
                      {/* ) : (
                      <div className={styles.videoArea}>
                        <div className={styles.playerWrapper}>
                          <ReactPlayer
                            url={item.video}
                            width="100%"
                            height="100%"
                            className={styles.reactPlayer}
                            controls={true}
                          />
                        </div>
                      </div>
                    )} */}
                    </>
                  ) : (
                    <></>
                  )}
                  {index % 2 === 0 ? <div className={styles.blankDiv}></div> : <></>}
                  <div className={index % 2 === 1 ? styles.pinkBoxArea01 : styles.pinkBoxArea}>
                    <div className={styles.pinkBoxOpacity} />
                    <div className={styles.pinkBox}>
                      <div className={globalStyles.tinyMCEClass}>
                        <div
                          className={styles.pinkTitle + ' tinymce-class'}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      </div>
                      <div className={globalStyles.tinyMCEClass}>
                        <div
                          className={styles.pinkText + ' tinymce-class'}
                          dangerouslySetInnerHTML={{ __html: item.detail }}
                        />
                      </div>
                      <div className={styles.pinkButtonArea}>
                        <button className={styles.pinkButton} onClick={() => router.push(item.url)}>
                          <Image src={ArrowLeftWhite} alt="" width={42} height={16} layout="fixed" />
                        </button>
                      </div>
                      <div className={globalStyles.tinyMCEClass}>
                        <div
                          className={styles.pinkText + ' tinymce-class'}
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        />
                      </div>
                    </div>
                  </div>
                  {index % 2 === 1 ? <div className={styles.blankDiv}></div> : <></>}
                  {index % 2 === 1 ? (
                    <>
                      {/* {item.type === 'image' ? ( */}
                      <div className={styles.imageArea + ' mb-5'}>
                        <Image
                          src={item.image !== null ? item.image : MainImage}
                          alt=""
                          width={345}
                          height={194}
                          layout="responsive"
                        />
                      </div>
                      {/* ) : (
                        <div className={styles.videoArea + ' mb-5'}>
                          <div className={styles.playerWrapper}>
                            <ReactPlayer
                              url={item.url}
                              width="100%"
                              height="100%"
                              className={styles.reactPlayer}
                              controls={true}
                            />
                          </div>
                        </div>
                      )} */}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default MainSection
