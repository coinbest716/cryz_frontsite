import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import CarouselService from 'components/components/service/CarouselService'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './detail.module.scss'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const Detail = props => {
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

  const mockupData = {
    id: 0,
    title: 'Entrenamiento de influencers',
    date: '2022-01-06T18:04:57.000Z',
    description:
      'Especialización dirigida a profesionales que quieran trabajar o que trabajen con embarazadas, post parto y hombres o mujeres con disfunción de suelo pélvico.',
  }

  // variables
  const { viewport } = props
  const [readMoreCurrentState, setReadMoreCurrentState] = useState('less')
  const [newsInfo, setNewInfo] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sliderData, setSliderData] = useState([])
  const [getCmsServiceSubject, { data: cmsSubjectData, loading: cmsSubjectLoading, error: cmsSubjectError }] =
    useLazyQuery(graphql.queries.getCmsServiceSubject)

  useEffect(() => {
    setNewInfo(mockupData)
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
    }
  }, [cmsSubjectLoading, cmsSubjectData, cmsSubjectError])

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + ' my-20'}>
          <div className={'flex flex-wrap justify-between'}>
            <div className="w-5/12">
              <div className={'mt-9'}>
                <BackButton viewport={viewport} />
              </div>
              <div className={styles.title + ' mt-16'}>{newsInfo.title}</div>
              <div className={styles.date + ' my-6'}>{moment(newsInfo.date).locale('es').format('LL')}</div>

              <div
                className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? ' ' : styles.expand)}
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
            <div className="w-5/12 flex justify-center mt-32">
              <div>
                <CarouselService sliderData={sliderData} viewport={viewport} type={'news'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Detail

Detail.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
