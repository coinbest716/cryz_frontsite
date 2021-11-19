import React from 'react'

// next components
import Image from 'next/image'
import router from 'next/router'

// components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'

// images
import ArrowLeftWhite from 'assets/images/arrow-left-white.svg'

// json data
import MainSectionData from 'assets/data/MainSectionData'

// styles
import styles from 'components/Home/MainSection.module.scss'

const MainSection = props => {
  const { mainImage } = props
  return (
    <div className={'w-full p-0 relative'}>
      <div className={'relative w-full p-0 m-0 h-screen -z-10'}>
        {mainImage !== '' ? (
          <Image src={mainImage?.path} alt="" layout="fill" objectFit="cover" objectPosition="top" />
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
            {MainSectionData.map((item, index) => (
              <div key={index}>
                {item.id === 1 || item.id === 3 ? (
                  <>
                    {item.type === 'image' ? (
                      <div className={styles.imageArea}>
                        <Image src={item.url} alt="" width={345} height={194} layout="responsive" />
                      </div>
                    ) : (
                      <div className={styles.videoArea}>
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
                    )}
                  </>
                ) : (
                  <></>
                )}
                {item.id === 1 || item.id === 3 ? <div className={styles.blankDiv}></div> : <></>}
                <div className={item.id === 2 ? styles.pinkBoxArea01 : styles.pinkBoxArea}>
                  <div className={styles.pinkBoxOpacity} />
                  <div className={styles.pinkBox}>
                    <div className={styles.pinkTitle} dangerouslySetInnerHTML={{ __html: item.title }} />
                    <div className={styles.pinkText} dangerouslySetInnerHTML={{ __html: item.content01 }} />
                    <div className={styles.pinkButtonArea}>
                      <button className={styles.pinkButton} onClick={() => router.push(item.link)}>
                        <Image src={ArrowLeftWhite} alt="" width={42} height={16} layout="fixed" />
                      </button>
                    </div>
                    <div className={styles.pinkText} dangerouslySetInnerHTML={{ __html: item.content02 }} />
                  </div>
                </div>
                {item.id === 2 ? <div className={styles.blankDiv}></div> : <></>}
                {item.id === 2 ? (
                  <>
                    {item.type === 'image' ? (
                      <div className={styles.imageArea + ' mb-5'}>
                        <Image src={item.url} alt="" width={345} height={194} layout="responsive" />
                      </div>
                    ) : (
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
                    )}
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
