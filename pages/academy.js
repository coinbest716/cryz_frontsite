import React, { useState, useEffect, useRef } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from 'pages/academy.module.scss'
import Image from 'next/image'
import topImage from 'assets/images/classland-top-image.svg'
import FaqButton from 'components/components/FaqButton'
import CarouselTeam from 'components/components/CarouselTeam'
import ArrowButton from 'components/components/ArrowButton'
import ClassCard from 'components/components/ClassCard'
import Accordian from 'components/components/Accordian'
import CircularMark from 'components/components/CircularMark'
import TeamSectionData from 'assets/data/TeamSectionData'
import ClassCardData from 'assets/data/ClassCardData'
import AccordianFaqData from 'assets/data/AccordianFaqData'

const Academy = () => {
  const faqRef = useRef(null)
  const [sliderData, setSliderData] = useState([])
  const [cardData, setCardData] = useState([])
  const [faqData, setFaqData] = useState([])
  const [filter, setFilter] = useState([
    { index: 0, label: 'filtro 1', active: false },
    { index: 1, label: 'filtro 2', active: false },
  ])

  useEffect(() => {
    setSliderData(TeamSectionData)
    setCardData(ClassCardData)
    setFaqData(AccordianFaqData)
  }, [])

  const executeScroll = () => {
    faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
  }

  const handleClickFilter = index => {
    const newArr = JSON.parse(JSON.stringify(filter))
    console.log(!newArr[index].active)
    newArr[index].active = !newArr[index].active
    setFilter(newArr)
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container}>
          <div className="flex justify-between pt-28">
            <div>
              <div className={styles.topTitle}>Academy</div>
              <div className={styles.topDash} />
              <div className="flex justify-start">
                <div className="mr-2">
                  {filter.map((item, index) => (
                    <ArrowButton filter={item} onClick={handleClickFilter} key={index} />
                  ))}
                </div>
                <div className="ml-1">{/* <ArrowButton filter={filter} onClick={handleClickFilter} /> */}</div>
              </div>
            </div>
          </div>
          <div className={styles.topSection}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4 sm:col-span-12 ">
                <div className={styles.topTitle}>Academy</div>
                <div className={styles.topDash} />
                <div className={styles.topDescription}>
                  Academy es la plataforma de entrenamientos en streaming en la que el equipo de Crys Dyaz cuenta con
                  más de 5.000 suscriptores que disfrutan cada semana de 34 clases de diferentes tipologías: fuerza,
                  pilates, pérdida de peso, embarazo, post parto, entre otras.
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 sm:col-span-12 ">
                <div className={styles.topRightSection}>
                  <div className={styles.topRightLetImage}>
                    {/* <Image src={topImage} alt="" width={435} height={471} className={styles.topImage} /> */}
                  </div>
                  <div>
                    <div className={'z-10'}>
                      <CircularMark />
                    </div>
                    <div className="mt-6">
                      <FaqButton onClick={executeScroll} />
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
        <div className={styles.divider} />
        <div style={{ marginBottom: '100px' }}>
          <div ref={faqRef} className={styles.faqString}>
            FAQ
          </div>
          {faqData?.map((data, index) => (
            <div style={{ padding: '7px 0px' }} key={index}>
              <Accordian title={data.title} description={data.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Academy

Academy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
