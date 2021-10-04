import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// custom components
import SocialButtonGroup from 'components/SocialButtonGroup'

// images
import previousButtonPinkIcon from 'assets/images/arrow-left-pink.svg'
import previousButtonGrayIcon from 'assets/images/arrow-left-gray.svg'
import nextButtonPinkIcon from 'assets/images/arrow-right-pink.svg'
import nextButtonGrayIcon from 'assets/images/arrow-right-gray.svg'
import TeamMember01 from 'assets/images/team-member-01.png'
import SignImg from 'assets/images/sign.svg'

// json data
import TeamSectionData from 'assets/data/TeamSectionData'
import SocialURLData from 'assets/data/SocialURLData'

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
          autoPlay={true}
          stopOnHover={true}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          centerMode={true}
          centerSlidePercentage={80}
          interval={1500}
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
      <div className="w-full flex mt-20 mb-11">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image src={TeamMember01} alt="" width={355} height={368} />
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-start items-center">
          <div className={styles.text}>
            En mis años de dedicación como deportista de élite formando parte de la Selección Española de natación,
            aprendí el valor del deporte y la importancia del cuidado y bienestar personal.
            <br />
            Ahora, mi objetivo principal es transmitir, junto a mi equipo, todo mi conocimiento en distintas áreas del
            deporte, fisioterapia y nutrición para lograr que nuestros pacientes alcancen y superen sus metas
            personales.
          </div>
          <div className="w-full flex justify-between my-4">
            <Image src={SignImg} alt="" width={181} height={88} />
            <div className={'w-full flex justify-end items-center'}>
              <SocialButtonGroup color="gray" socialURL={SocialURLData[0]} />
            </div>
          </div>
          <div className={styles.text}>
            Mis lemas son:
            <br />
            “Hoy es el día. Ahora el momento”
            <br />
            “Cuando amas lo que tienes, tienes todo lo que necesitas”
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSection
