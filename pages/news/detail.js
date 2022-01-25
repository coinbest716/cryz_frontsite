import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import NewsCarousel from 'components/news/NewsCarousel'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './detail.module.scss'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const Detail = props => {
  const router = useRouter()
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
  const [readMoreCurrentState, setReadMoreCurrentState] = useState('less')
  const [newsInfo, setNewsInfo] = useState({})
  const [getNewsByIdForDashboard, { data: newsData, loading: newsDataLoading, error: newsDataError }] = useLazyQuery(
    graphql.queries.getNewsByIdForDashboard
  )

  useEffect(() => {
    if (router.query.id) {
      getNewsByIdForDashboard({
        variables: {
          id: Number(router.query.id),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!newsDataError && newsData && newsData.getNewsByIdForDashboard) {
      setNewsInfo(newsData.getNewsByIdForDashboard)
    }
  }, [newsDataLoading, newsData, newsDataError])

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container + ' p-4 pb-10'}>
          <div className="w-full">
            <div className={'mt-5'}>
              <BackButton viewport={viewport} />
            </div>
            <div className="mt-5">
              <NewsCarousel sliderData={newsInfo.images} viewport={viewport} />
            </div>
            <div className={styles.m_title + ' mt-5'}>{newsInfo.title}</div>
            <div className={styles.m_date + ' my-2'}>{moment(newsInfo.publish_date).locale('es').format('LL')}</div>
            <div className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? ' ' : styles.expand)}>
              <div className={globalStyles.tinyMCEClass}>
                <div className={'tinymce-class'} dangerouslySetInnerHTML={{ __html: newsInfo.content }}></div>
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
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div className={'flex flex-wrap justify-between'}>
                <div className="w-5/12">
                  <div className={'mt-9'}>
                    <BackButton viewport={viewport} />
                  </div>
                  <div className={styles.title + ' mt-16'}>{newsInfo.title}</div>
                  <div className={styles.date + ' my-6'}>{moment(newsInfo.publish_date).locale('es').format('LL')}</div>

                  <div
                    className={
                      'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? ' ' : styles.expand)
                    }
                  >
                    <div className={globalStyles.tinyMCEClass}>
                      <div className={'tinymce-class'} dangerouslySetInnerHTML={{ __html: newsInfo.content }}></div>
                    </div>
                    <ReadMoreButton
                      currentState={readMoreCurrentState}
                      onClick={state => handleReadMore(state)}
                      type={'physiotherapy'}
                      viewport={viewport}
                    />
                  </div>
                </div>
                <div className="w-5/12 flex justify-center mt-36">
                  <div>
                    <NewsCarousel sliderData={newsInfo.images} viewport={viewport} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Detail

Detail.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
