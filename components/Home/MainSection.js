import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'

// images
import MainImage from 'assets/images/main.png'
import ArrowLeftWhite from 'assets/images/arrow-left-white.svg'

// json data
import MainSectionData from 'assets/data/MainSectionData'

// styles
import styles from 'components/Home/MainSection.module.scss'

const MainSection = () => {
  return (
    <div className={'w-full p-0 relative'}>
      <div className={'relative w-full p-0 m-0 h-screen -z-10'}>
        <Image src={MainImage} alt="" width={1440} height={898} layout="fill" objectFit="cover" />
      </div>
      <div id="topToBottom" className={styles.topToBottom}>
        TUS METAS
      </div>
      <div id="bottomToTop" className={styles.bottomToTop}>
        Alcanza
      </div>
      <div className={'absolute flex justify-end w-1/3 top-0 right-0 p-0 m-0 h-screen'}>
        <div className={'w-full ' + styles.mainCarouselArea}>
          <Carousel
            showArrows={false}
            showThumbs={false}
            autoPlay={true}
            stopOnHover={true}
            showStatus={false}
            showIndicators={true}
            infiniteLoop={true}
            interval={3000}
            axis="vertical"
            dynamicHeight={true}
          >
            {MainSectionData.map((item, index) => (
              <div key={index}>
                {item.id === 1 || item.id === 3 ? (
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
                ) : (
                  <></>
                )}
                {item.id === 1 || item.id === 3 ? <div className={styles.blankDiv}></div> : <></>}
                <div className={styles.pinkBox}>
                  <div className={styles.pinkTitle} dangerouslySetInnerHTML={{ __html: item.title }}></div>
                  <div className={styles.pinkText}>{item.content01}</div>
                  <div className={styles.pinkButtonArea}>
                    <button className={styles.pinkButton}>
                      <Image src={ArrowLeftWhite} alt="" width={42} height={16} layout="fixed" />
                    </button>
                  </div>
                  <div className={styles.pinkText}>{item.content02}</div>
                </div>
                {item.id === 2 ? <div className={styles.blankDiv}></div> : <></>}
                {item.id === 2 ? (
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
