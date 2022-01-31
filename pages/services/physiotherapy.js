import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import CarouselService from 'components/service/CarouselService'
import ArrowButton from 'components/service/ArrowButton'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import ServiceButton from 'components/service/ServiceButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './physiotherapy.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Physiotherapy = props => {
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
  const router = useRouter()
  const [getCmsServiceSubject, { data: cmsSubjectData, loading: cmsSubjectLoading, error: cmsSubjectError }] =
    useLazyQuery(graphql.queries.getCmsServiceSubject)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [personalButton, setPersonalButton] = useState(false)
  const [onlineButton, setOnlineButton] = useState(false)
  const [streamButton, setStreamButton] = useState(false)
  const [sliderData, setSliderData] = useState([])
  const [readMoreCurrentState, setReadMoreCurrentState] = useState('less')

  // handlers
  useEffect(() => {
    getCmsServiceSubject({
      variables: {
        discipline_id: 2,
      },
    })
  }, [getCmsServiceSubject])

  useEffect(() => {
    dispatch({ type: 'set', isLoading: cmsSubjectLoading })
    if (!cmsSubjectError && cmsSubjectData && cmsSubjectData.getCmsServiceSubject) {
      setTitle(cmsSubjectData.getCmsServiceSubject.title_two)
      setDescription(cmsSubjectData.getCmsServiceSubject.text)
      setSliderData(cmsSubjectData.getCmsServiceSubject.carousel_image || [])
      setPersonalButton(cmsSubjectData.getCmsServiceSubject.personal_button || false)
      setOnlineButton(cmsSubjectData.getCmsServiceSubject.online_button || false)
      setStreamButton(cmsSubjectData.getCmsServiceSubject.stream_button || false)
    }
  }, [cmsSubjectLoading, cmsSubjectData, cmsSubjectError])

  const handleClickBuyPersion = () => {
    router.push({
      pathname: '/buy/buy-person',
      query: {
        discipline_id: 2,
        service_type: 'personal',
        type: 'service',
        image: sliderData.length > 0 ? sliderData[0].path : '',
      },
    })
  }
  const handleClickBuyPlan = () => {
    router.push({
      pathname: '/buy/buy-plans-online',
      query: {
        discipline_id: 2,
        service_type: 'online',
        type: 'service',
        image: sliderData.length > 0 ? sliderData[0].path : '',
      },
    })
  }
  const handleClickBuyStreaming = () => {
    router.push({
      pathname: '/buy/buy-one-to-one',
      query: {
        discipline_id: 2,
        service_type: 'streaming',
        type: 'service',
        image: sliderData.length > 0 ? sliderData[0].path : '',
      },
    })
  }

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={viewport === 'mobile' ? styles.m_container : styles.container}>
      <div className={'flex flex-wrap justify-center ' + (viewport === 'mobile' ? ' pb-5' : ' pb-20')}>
        <div className={globalStyles.container}>
          <div className={'mt-9'}>
            <BackButton viewport={viewport} />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
              <div className={viewport === 'mobile' ? styles.m_topTitle : styles.topTitle}>{title}</div>
              <div className={viewport === 'mobile' ? styles.m_topDash : styles.topDash} />
              <div className={styles.topDescription + (viewport === 'mobile' ? ' mt-5' : ' mt-10 pb-20')}>
                <div
                  className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
                >
                  <div className={globalStyles.tinyMCEClass}>
                    <div className={'tinymce-class'} dangerouslySetInnerHTML={{ __html: description }}></div>
                  </div>
                  <ReadMoreButton
                    currentState={readMoreCurrentState}
                    onClick={state => handleReadMore(state)}
                    type={'physiotherapy'}
                    viewport={viewport}
                  />
                </div>
              </div>
            </div>
            {viewport === 'mobile' && (
              <div className={'col-span-12'}>
                {personalButton && (
                  <div className={'w-2/3 py-2'}>
                    <ServiceButton label={'Compra Presenciales'} onClick={handleClickBuyPersion} />
                  </div>
                )}
                {onlineButton && (
                  <div className={'w-2/3 py-2'}>
                    <ServiceButton label={'Compra planes online'} onClick={handleClickBuyPlan} />
                  </div>
                )}
                {streamButton && (
                  <div className={'w-2/3 py-2'}>
                    <ServiceButton label={'Compra 1 to 1 en streaming'} onClick={handleClickBuyStreaming} />
                  </div>
                )}
              </div>
            )}
            <div
              className={
                'col-span-12 md:col-span-7 sm:col-span-12 relative flex ' +
                (viewport === 'mobile' ? ' justify-center' : ' justify-end')
              }
            >
              {viewport !== 'mobile' && (
                <div className={'absolute top-10 z-10'}>
                  <CircularMark viewport={viewport} />
                </div>
              )}
              <div className={viewport === 'mobile' ? styles.m_carouselSection : styles.carouselSection}>
                <CarouselService sliderData={sliderData} viewport={viewport} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewport !== 'mobile' && (
        <div className={'flex justify-start'}>
          {personalButton && (
            <div className={'w-1/3'}>
              <ArrowButton
                label={'Compra presencial'}
                onClick={handleClickBuyPersion}
                type={'physiotherapy'}
                viewport={viewport}
              />
            </div>
          )}
          {onlineButton && (
            <div className={'w-1/3'}>
              <ArrowButton
                label={'Compra planes online'}
                onClick={handleClickBuyPlan}
                type={'physiotherapy'}
                viewport={viewport}
              />
            </div>
          )}
          {streamButton && (
            <div className={'w-1/3'}>
              <ArrowButton
                label={'Compra 1 to 1 en streaming'}
                onClick={handleClickBuyStreaming}
                type={'physiotherapy'}
                viewport={viewport}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default Physiotherapy

Physiotherapy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
