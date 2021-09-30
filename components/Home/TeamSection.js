import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// images
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'

// json data
import TeamSectionData from 'assets/data/TeamSectionData'

// styles
import styles from 'components/Home/TeamSection.module.scss'
import globalStyles from 'styles/GlobalStyle.module.scss'

const TeamSection = () => {
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    setSliderData(TeamSectionData)
  }, [])

  return (
    <div className={globalStyles.container}>
      <div className={styles.title}>Equipo</div>
      <div className={styles.divider}></div>
      <div className={'w-full md:w-1/2 ' + styles.text}>
        El equipo de Crys Dyaz & CO está compuesto por profesionales de diferentes ámbitos del deporte y fisioterapeutas
        dedicados a mejorar la salud de nuestros pacientes y ayudarles a mejorar sus hábitos.
      </div>
      {sliderData.length !== 0 ? (
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
            <div key={index} className="mx-1">
              <Image src={item.image} alt="" width={902} height={388} />
            </div>
          ))}
        </Carousel>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TeamSection
