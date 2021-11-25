import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import CarouselService from 'components/components/service/CarouselService'
import ArrowButton from 'components/components/service/ArrowButton'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './physiotherapy.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Physiotherapy = () => {
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
  }, [])

  useEffect(() => {
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
      query: { discipline_id: 2, service_type: 'personal' },
    })
  }
  const handleClickBuyPlan = () => {
    router.push({
      pathname: '/buy/buy-plans-online',
      query: { discipline_id: 2, service_type: 'online' },
    })
  }
  const handleClickBuyStreaming = () => {
    router.push({
      pathname: '/buy/buy-one-to-one',
      query: { discipline_id: 2, service_type: 'streaming' },
    })
  }

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={styles.container}>
      <div className={'flex flex-wrap justify-center pb-20'}>
        <div className={globlaStyle.container}>
          <div className={'mt-9'}>
            <BackButton />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
              <div className={'pt-10 pb-2 ' + styles.topTitle}>{title}</div>
              <div className={styles.topDash} />
              <div className={styles.topDescription + ' mt-10 pb-20'}>
                <div
                  className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
                >
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                  <ReadMoreButton currentState={readMoreCurrentState} onClick={state => handleReadMore(state)} />
                </div>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-7 sm:col-span-12 relative flex justify-end'}>
              <div className={'absolute top-10 z-10'}>
                <CircularMark />
              </div>
              <div className={styles.carouselSection}>
                <CarouselService sliderData={sliderData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'flex justify-start'}>
        {personalButton && (
          <div className={'w-1/3'}>
            <ArrowButton label={'Compra person'} onClick={handleClickBuyPersion} type={'physiotherapy'} />
          </div>
        )}
        {onlineButton && (
          <div className={'w-1/3'}>
            <ArrowButton label={'Compra planes online'} onClick={handleClickBuyPlan} type={'physiotherapy'} />
          </div>
        )}
        {streamButton && (
          <div className={'w-1/3'}>
            <ArrowButton
              label={'Compra 1 to 1 en streaming'}
              onClick={handleClickBuyStreaming}
              type={'physiotherapy'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Physiotherapy

Physiotherapy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
