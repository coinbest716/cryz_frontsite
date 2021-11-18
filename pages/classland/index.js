import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import FaqButton from 'components/components/FaqButton'
import CarouselTeam from 'components/components/CarouselTeam'
import FilterButton from 'components/components/FilterButton'
import ClassCard from 'components/components/ClassCard'
import Accordian from 'components/components/Accordian'
import CircularMark from 'components/components/CircularMark'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from 'pages/classland/classland.module.scss'

// images
import topImage from 'public/images/classland-top-image.svg'

// json data
import TeamSectionData from 'assets/data/TeamSectionData'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Classland = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const faqRef = useRef(null)
  const [sliderData, setSliderData] = useState([])
  const [cardData, setCardData] = useState([])
  const [faqData, setFaqData] = useState([])
  const [filterKey, setFilterKey] = useState(0)
  const [filter, setFilter] = useState([])

  const [getClasslands, { data: classlandsData, loading: classlandsLoading, error: classlandsError }] = useLazyQuery(
    graphql.queries.getClasslands
  )
  const [getFaqs, { data: faqsData, loading: faqsLoading, error: faqsError }] = useLazyQuery(graphql.queries.getFaqs)

  // handlers

  useEffect(() => {
    getClasslands({ variables: { category: 'Actívate' } })
    getFaqs()
  }, [])

  useEffect(() => {
    if (!classlandsError && classlandsData && classlandsData.getClasslands) {
      setCardData(classlandsData.getClasslands)
    }
  }, [classlandsLoading, classlandsData, classlandsError])

  useEffect(() => {
    if (!faqsError && faqsData && faqsData.getFaqs) {
      setFaqData(faqsData.getFaqs)
    }
  }, [faqsLoading, faqsData, faqsError])

  useEffect(() => {
    setSliderData(TeamSectionData)
    setFilter([
      { index: 0, label: 'Actívate' },
      { index: 1, label: 'Bienestar' },
      { index: 2, label: 'Embarazo' },
      { index: 3, label: 'Post parto' },
    ])
  }, [])

  const handleClickFilter = index => {
    setFilterKey(index)
    getClasslands({ variables: { category: filter[index].label } })
  }

  const executeScroll = () => {
    faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globlaStyle.container + ' mt-20'}>
          <div className={styles.topSection}>
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-12 md:col-span-4 sm:col-span-12 '}>
                <div className={styles.topTitle}>Classland</div>
                <div className={styles.topDash} />
                <div className={styles.topDescription}>
                  Classland es la plataforma de entrenamientos en streaming en la que el equipo de Crys Dyaz cuenta con
                  más de 5.000 suscriptores que disfrutan cada semana de 34 clases de diferentes tipologías: fuerza,
                  pilates, pérdida de peso, embarazo, post parto, entre otras.
                </div>
              </div>
              <div className={'col-span-12 md:col-span-8 sm:col-span-12 '}>
                <div className={styles.topRightSection}>
                  <div className={styles.topRightLetImage}>
                    <Image src={topImage} alt="" width={435} height={471} className={styles.topImage} />
                  </div>
                  <div>
                    <div className={'z-10'}>
                      <CircularMark />
                    </div>
                    <div className={'mt-6'}>
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
          {filter.map((item, index) => (
            <div className={'mr-3'} key={index}>
              <FilterButton
                active={index === filterKey}
                filter={item}
                onClick={() => handleClickFilter(index)}
                key={index}
              />
            </div>
          ))}
        </div>
        <div className={styles.cardSection}>
          <div className={'grid grid-cols-12 gap-8'}>
            {cardData?.map((card, index) => (
              <div className={'col-span-12 flex md:col-span-6 lg:col-span-4 ' + styles.cardAlign} key={index}>
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
              <Accordian title={data.name} description={data.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Classland

Classland.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
