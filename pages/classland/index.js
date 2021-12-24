import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import FaqButton from 'components/components/FaqButton'
import ClasslandCarousel from 'components/components/ClasslandCarousel'
import MobileClasslandCarousel from 'components/components/MobileClasslandCarousel'
import MobileDoubleClasslandCarousel from 'components/components/MobileDoubleClasslandCarousel'
import FilterButton from 'components/components/FilterButton'
import ClassCard from 'components/components/ClassCard'
import Accordian from 'components/components/Accordian'
import CircularMark from 'components/components/CircularMark'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/classland/classland.module.scss'

// images
import topImage from 'public/images/classland-top-image.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Classland = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props
  const faqRef = useRef(null)
  const [main, setMain] = useState({})
  const [sliderData, setSliderData] = useState([])
  const [cardData, setCardData] = useState([])
  const [faqData, setFaqData] = useState([])
  const [filterKey, setFilterKey] = useState(0)
  const [filterValue, setFilterValue] = useState('ALL')
  const [filter, setFilter] = useState([
    { id: 'ALL', value: 'TODO' },
    {
      id: 'active',
      value: 'Actívate',
    },
    {
      id: 'wellness',
      value: 'Bienestar',
    },
    {
      id: 'pregnancy',
      value: 'Embarazo',
    },
    {
      id: 'postpartum',
      value: 'Postparto',
    },
  ])

  const [getClasslandMain, { data: classlandMainData, loading: classlandMainLoading, error: classlandMainError }] =
    useLazyQuery(graphql.queries.getClasslandMain)
  const [
    getClasslandCategory,
    { data: classlandCategoryData, loading: classlandCategoryLoading, error: classlandCategoryError },
  ] = useLazyQuery(graphql.queries.getClasslandCategory)
  const [getClasslandFaqs, { data: classlandFaqData, loading: classlandFaqLoading, error: classlandFaqError }] =
    useLazyQuery(graphql.queries.getClasslandFaqs)

  // handlers
  useEffect(() => {
    getClasslandMain()
    getClasslandCategory({ variables: { category: 'ALL' } })
    getClasslandFaqs()
  }, [getClasslandMain, getClasslandCategory, getClasslandFaqs])

  useEffect(() => {
    if (!classlandMainError && classlandMainData && classlandMainData.getClasslandMain) {
      setMain(classlandMainData.getClasslandMain)
      setSliderData(classlandMainData.getClasslandMain.images)
    }
  }, [classlandMainLoading, classlandMainData, classlandMainError])

  useEffect(() => {
    if (!classlandCategoryError && classlandCategoryData && classlandCategoryData.getClasslandCategory) {
      setCardData(classlandCategoryData.getClasslandCategory)
    }
  }, [classlandCategoryLoading, classlandCategoryData, classlandCategoryError])

  useEffect(() => {
    if (!classlandFaqError && classlandFaqData && classlandFaqData.getClasslandFaqs) {
      setFaqData(classlandFaqData.getClasslandFaqs)
    }
  }, [classlandFaqLoading, classlandFaqData, classlandFaqError])

  const handleClickFilter = index => {
    setFilterKey(index)
    getClasslandCategory({ variables: { category: filter[index].id } })
  }

  const handleClickSelectFilter = event => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
    // setFilterKey(index)
    getClasslandCategory({ variables: { category: event.target.value } })
  }

  const executeScroll = () => {
    faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>
          <div className={globalStyles.container}>
            <div className={styles.topSection}>
              <div className={styles.m_topTitle}>{main?.title}</div>
              <div className={styles.topDash} />
            </div>
            <div className={styles.m_topRightSection}>
              <div className={styles.topRightLetImage}>
                <Image src={topImage} alt="" width={200} height={231} className={styles.topImage} />
              </div>
              <div className={'absolute bottom-3 right-2'}>
                <FaqButton onClick={executeScroll} viewport={viewport} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={globalStyles.container + ' mt-20'}>
            <div className={styles.topSection}>
              <div className={'grid grid-cols-12 gap-4'}>
                <div className={'col-span-12 md:col-span-4 sm:col-span-12 '}>
                  <div className={styles.topTitle}>{main?.title}</div>
                  <div className={styles.topDash} />
                  <div className={globalStyles.tinyMCEClass}>
                    <div
                      className={styles.topDescription + ' tinymce-class'}
                      dangerouslySetInnerHTML={{ __html: main?.text }}
                    ></div>
                  </div>
                </div>
                <div className={'col-span-12 md:col-span-8 sm:col-span-12 '}>
                  <div className={styles.topRightSection}>
                    <div className={styles.topRightLetImage}>
                      <Image src={topImage} alt="" width={435} height={471} className={styles.topImage} />
                    </div>
                    <div>
                      <div className={'z-10'}>
                        <CircularMark viewport={viewport} />
                      </div>
                      <div className={'mt-6'}>
                        <FaqButton onClick={executeScroll} viewport={viewport} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={'w-full px-4'}>
        {viewport === 'mobile' ? (
          <div className={styles.middleSection}>
            <div className={styles.m_fullPass}>Full Pass</div>
            {sliderData.length !== 0 ? <MobileClasslandCarousel sliderData={sliderData} url={main.url} /> : <></>}
            <div className={globalStyles.tinyMCEClass}>
              <div
                className={styles.topDescription + ' tinymce-class mt-4'}
                dangerouslySetInnerHTML={{ __html: main?.text }}
              ></div>
            </div>
          </div>
        ) : (
          <div className={styles.middleSection}>
            <div className={styles.fullPass}>Full Pass</div>
            {sliderData.length !== 0 ? <ClasslandCarousel sliderData={sliderData} url={main.url} /> : <></>}
          </div>
        )}
        <div className={styles.m_buttonGroup}>
          {viewport === 'mobile' ? (
            <select
              name="select"
              onChange={handleClickSelectFilter}
              value={filterValue}
              className={'flex justify-end items-center ' + styles.select}
            >
              {filter.map((item, index) => (
                <option key={index} value={item.id} className={styles.option}>
                  {item.value}
                </option>
              ))}
            </select>
          ) : (
            filter.map((item, index) => (
              <div className={'mr-3'} key={index}>
                <FilterButton
                  active={index === filterKey}
                  filter={item}
                  onClick={() => handleClickFilter(index)}
                  key={index}
                />
              </div>
            ))
          )}
        </div>
        {viewport === 'mobile' ? (
          <div className={styles.m_cardSection}>
            {cardData.length !== 0 ? <MobileDoubleClasslandCarousel coTeam={cardData} /> : <></>}
          </div>
        ) : (
          <div className={styles.cardSection}>
            <div className={'grid grid-cols-12 gap-8'}>
              {cardData?.map((card, index) =>
                card.visible ? (
                  <div className={'col-span-12 flex md:col-span-6 lg:col-span-4 ' + styles.cardAlign} key={index}>
                    <ClassCard data={card} key={index} />
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </div>
          </div>
        )}
        {viewport === 'mobile' ? (
          <div>
            <div className={'my-6 ' + styles.m_divider} />
            <div className="mb-5">
              <div ref={faqRef} className={'mb-4 ' + styles.m_faqString}>
                FAQ
              </div>
              {faqData?.map((data, index) => (
                <div style={{ padding: '7px 0px' }} key={index}>
                  <Accordian title={data.name} description={data.description} viewport={viewport} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.divider} />
            <div style={{ marginBottom: '100px' }}>
              <div ref={faqRef} className={styles.faqString}>
                FAQ
              </div>
              {faqData?.map((data, index) => (
                <div style={{ padding: '7px 0px' }} key={index}>
                  <Accordian title={data.name} description={data.description} viewport={viewport} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Classland

Classland.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
