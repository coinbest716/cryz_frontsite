import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'

// images
import MainImage from 'assets/images/main.png'

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
        <div className={'w-full z-10 ' + styles.mainCarouselArea}>
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
            {/* first element */}
            <div>
              <div className={styles.videoArea}>
                <div className={styles.playerWrapper}>
                  <ReactPlayer
                    url="https://www.w3schools.com/html/mov_bbb.mp4"
                    width="100%"
                    height="100%"
                    className={styles.reactPlayer}
                    controls={true}
                  />
                </div>
              </div>
              <div className={styles.blankDiv}></div>
              <div className={styles.pinkBox}>
                <div className={styles.pinkTitle}>Descubre la unidad SALUD FEM.</div>
                <div className={styles.pinkText}>
                  Integrada por fisioterapeutas y entrenadoras especializadas en el cuidado integral de la mujer en
                  todas las etapas de su vida.
                </div>
              </div>
            </div>
            {/* second element */}
            <div>
              <div className={styles.pinkBox}>
                <div className={styles.pinkTitle}>Descubre la unidad SALUD FEM.</div>
                <div className={styles.pinkText}>
                  Integrada por fisioterapeutas y entrenadoras especializadas en el cuidado integral de la mujer en
                  todas las etapas de su vida.
                </div>
              </div>
              <div className={styles.blankDiv}></div>
              <div className={styles.videoArea}>
                <div className={styles.playerWrapper}>
                  <ReactPlayer
                    url="https://www.w3schools.com/html/mov_bbb.mp4"
                    width="100%"
                    height="100%"
                    className={styles.reactPlayer}
                    controls={true}
                  />
                </div>
              </div>
            </div>
            {/* third element */}
            <div>
              <div className={styles.videoArea}>
                <div className={styles.playerWrapper}>
                  <ReactPlayer
                    url="https://www.w3schools.com/html/mov_bbb.mp4"
                    width="100%"
                    height="100%"
                    className={styles.reactPlayer}
                    controls={true}
                  />
                </div>
              </div>
              <div className={styles.blankDiv}></div>
              <div className={styles.pinkBox}>
                <div className={styles.pinkTitle}>Descubre la unidad SALUD FEM.</div>
                <div className={styles.pinkText}>
                  Integrada por fisioterapeutas y entrenadoras especializadas en el cuidado integral de la mujer en
                  todas las etapas de su vida.
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default MainSection
