import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// next components
import { useRouter } from 'next/router'

// custom component
import CircularMark from 'components/components/CircularMark'

// images
import StarGroup from 'assets/images/star-group.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'components/FemaleHealth/MainSection.module.scss'

const MainSection = props => {
  const { data } = props
  const router = useRouter()

  const handleGotoDiscipline = () => {
    const sectionPosition = document.getElementById('discipline').offsetTop
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth',
    })
    setTimeout(() => {
      router.push('/female-health#discipline')
    }, 500)
  }
  return (
    <div className={'w-full p-0'}>
      <div className={'relative w-full p-0 m-0 h-screen flex flex-wrap justify-center ' + styles.container}>
        {/* carousel part */}
        <div className={'relative h-full grid grid-cols-12 gap-4'}>
          <div className={'col-span-5 flex'}></div>
          <div className={'col-span-7 flex ml-0 md:ml-11'}>
            <div className={'col-span-7 flex justify-center items-center'}>
              <div>
                {data.images.length !== 0 ? (
                  <Carousel
                    showArrows={false}
                    showThumbs={false}
                    autoPlay={true}
                    stopOnHover={true}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={33}
                    interval={3000}
                  >
                    {data.images.map((item, index) => (
                      <div key={index} className={'mx-1.5'}>
                        <Image src={item.path} alt="" width={283} height={544} className={styles.slideImage} />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* text part */}
        <div className={globalStyles.container + ' absolute '}>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-5 flex'}>
              <div className={'w-full'}>
                <div className={'inline-grid'}>
                  <p className={styles.title}>{data.title_one}</p>
                  <p className={styles.title}>{data.title_two}</p>
                </div>
                <div className={'w-full flex items-end '}>
                  <div className={styles.divider} />
                  <div className={'ml-4 mr-2 ' + styles.byText}>by</div>
                  <div className={styles.subTitle}>{data.sub_title}</div>
                </div>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.text }} />
              </div>
            </div>
            <div className={'col-span-7 flex justify-end z-10'}>
              <CircularMark />
            </div>
          </div>
        </div>
        {/* continue browsing part */}
        <div className={globalStyles.container + ' absolute bottom-0 ' + styles.continueBrowsingArea}>
          <div
            className={'absolute bottom-0 block jusity-center cursor-pointer right-10 '}
            onClick={() => handleGotoDiscipline()}
          >
            <div className={styles.continueBrowsing}>Seguir navegando</div>
            <Image src={StarGroup} alt="" width={29} height={64} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSection
