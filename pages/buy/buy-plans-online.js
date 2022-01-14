import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom component
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import BuyCard from 'components/components/BuyCard'
import MobileBuyCard from 'components/components/MobileBuyCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/buy/index.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import { Auth } from 'aws-amplify'
import * as gtag from '../../utils/gtag'

const BuyPlansOnline = props => {
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
  const [description, setDescription] = useState('')
  const [sessionData, setSessionData] = useState([])

  const [getCmsServiceSubjectByType, { data: cmsSubjectData, loading: cmsSubjectLoading, error: cmsSubjectError }] =
    useLazyQuery(graphql.queries.getCmsServiceSubjectByType)

  const [
    getFemHealthServiceSubjectByType,
    { data: femHealthServiceSubjectData, loading: femHealthServiceSubjectLoading, error: femHealthServiceSubjectError },
  ] = useLazyQuery(graphql.queries.getFemHealthServiceSubjectByType)

  // handlers
  useEffect(() => {
    if (router.query.type === 'service') {
      getCmsServiceSubjectByType({
        variables: { discipline_id: parseInt(router.query.discipline_id), service_type: router.query.service_type },
      })
    } else if (router.query.type === 'femHealth') {
      getFemHealthServiceSubjectByType({
        variables: { discipline_id: parseInt(router.query.discipline_id), service_type: router.query.service_type },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!cmsSubjectError && cmsSubjectData && cmsSubjectData.getCmsServiceSubjectByType) {
      setDescription(cmsSubjectData.getCmsServiceSubjectByType.bono_text || '')
      setSessionData(cmsSubjectData.getCmsServiceSubjectByType.services || [])
      const servicesViewed = []

      for (let service of cmsSubjectData.getCmsServiceSubjectByType.services) {
        servicesViewed.push({
          id: service.id,
          name: service.name,
          list_name: service.web_name,
          brand: 'Crys Dyaz & Co',
          quantity: 1,
          price: service.price,
        })
      }

      gtag.event({
        action: 'view_item_list',
        params: {
          items: servicesViewed,
        },
      })
    }
  }, [cmsSubjectLoading, cmsSubjectData, cmsSubjectError])

  useEffect(() => {
    if (
      !femHealthServiceSubjectError &&
      femHealthServiceSubjectData &&
      femHealthServiceSubjectData.getFemHealthServiceSubjectByType
    ) {
      setDescription(femHealthServiceSubjectData.getFemHealthServiceSubjectByType.bono_text || '')
      setSessionData(femHealthServiceSubjectData.getFemHealthServiceSubjectByType.services || [])
    }
  }, [femHealthServiceSubjectLoading, femHealthServiceSubjectData, femHealthServiceSubjectError])

  const handleClickBuy = (service_id, description, price) => {
    gtag.event({
      action: 'select_content',
      params: {
        content_type: 'product',
        items: [
          {
            id: service_id,
            name: description,
            brand: 'Crys Dyaz & Co',
            quantity: 1,
            price: price,
          },
        ],
      },
    })

    Auth.currentAuthenticatedUser()
      .then(() => {
        router.push({
          pathname: '/purchase',
          query: { service_id: service_id, tab: 0, image: router.query.image, description: description, price: price },
        })
      })
      .catch(() => {
        router.push({
          pathname: '/purchase-login',
          query: { service_id: service_id, tab: 0, image: router.query.image, description: description, price: price },
        })
      })
  }
  return (
    <div className={viewport === 'mobile' ? styles.m_container : styles.container}>
      <div className={globalStyles.container}>
        <div className={viewport === 'mobile' ? styles.m_backButtonArea : styles.backButtonArea}>
          <BackButton viewport={viewport} />
        </div>
        {viewport === 'mobile' ? (
          <div>
            <div className={styles.m_title}>Bonos y Sesiones</div>
            <div className={styles.m_divider} />
            <div className={globalStyles.tinyMCEClass}>
              <div className={'tinymce-class'} dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </div>
        ) : (
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-6'}>
              <div className={styles.title}>Bonos y Sesiones</div>
              <div className={styles.divider} />
              <div className={globalStyles.tinyMCEClass}>
                <div className={'tinymce-class'} dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
            </div>
            <div className={'col-span-6 flex justify-end z-10'}>
              <CircularMark viewport={viewport} />
            </div>
          </div>
        )}
        {viewport === 'mobile' ? (
          <div className={'mt-10 mb-6 grid grid-cols-12 gap-4'}>
            {sessionData.map((item, index) => (
              <div className={'col-span-12'} key={index}>
                <MobileBuyCard data={item} index={index} handleClickBuy={handleClickBuy} />
              </div>
            ))}
          </div>
        ) : (
          <div className={'mt-5 mb-10 grid grid-cols-12 gap-6'}>
            {sessionData.map((item, index) => (
              <div className={'col-span-4'} key={index}>
                <BuyCard data={item} index={index} handleClickBuy={handleClickBuy} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyPlansOnline

BuyPlansOnline.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
