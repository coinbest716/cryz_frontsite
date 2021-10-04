import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/classland.module.scss'
import Image from 'next/image'
// import topImage from 'assets/images/classland-top-image.svg'
import topImage from 'assets/images/main-placeholder.png'
import ContactMark from 'assets/images/contact-mark.svg'
import FaqButton from 'components/components/FaqButton'
import CarouselTeam from 'components/components/CarouselTeam'
import ArrowButton from 'components/components/ArrowButton'
import ClassCard from 'components/components/ClassCard'
import TeamSectionData from 'assets/data/TeamSectionData'
import ClassCardData from 'assets/data/ClassCardData'

const Classland = () => {
  const [sliderData, setSliderData] = useState([])
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    setSliderData(TeamSectionData)
    setCardData(ClassCardData)
  }, [])

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container}>
          <div className={styles.topSection}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4 sm:col-span-12 ">
                <div className={styles.topTitle}>Classland</div>
                <div className={styles.topDash} />
                <div className={styles.topDescription}>
                  Classland es la plataforma de entrenamientos en streaming en la que el equipo de Crys Dyaz cuenta con
                  más de 5.000 suscriptores que disfrutan cada semana de 34 clases de diferentes tipologías: fuerza,
                  pilates, pérdida de peso, embarazo, post parto, entre otras.
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 sm:col-span-12 ">
                <div className={styles.topRightSection}>
                  <div className={styles.topRightLetImage}>
                    <Image src={topImage} alt="" width={435} height={471} opacity={0.74} />
                  </div>
                  <div>
                    <Image src={ContactMark} alt="" width={173} height={173} opacity={0.72} />
                    <div className="mt-8">
                      <FaqButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'w-full ' + globlaStyle.container}>
        <div className={styles.middleSection}>
          <div className={styles.fullPass}>Full Pass</div>
          <CarouselTeam sliderData={sliderData} />
        </div>
      </div>
      <div className={'w-full ' + globlaStyle.container}>
        <div className={styles.buttonGroup}>
          <div className="mr-1">
            <ArrowButton label={'Actívate'} />
          </div>
          <div className="mx-1">
            <ArrowButton label={'Bienestar'} />
          </div>
          <div className="mx-1">
            <ArrowButton label={'Embarazo'} />
          </div>
          <div className="ml-1">
            <ArrowButton label={'Post parto'} />
          </div>
        </div>
        <div className={styles.cardSection}>
          <div className="grid grid-cols-12 gap-12">
            {cardData?.map((card, index) => (
              <div className={'col-span-12 flex  md:col-span-4 sm:col-span-12 ' + styles.cardAlign} key={index}>
                <ClassCard data={card} key={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Classland

Classland.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
