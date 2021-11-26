import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// next components
import router from 'next/router'

// custom component
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import BuyCard from 'components/components/BuyCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/buy/index.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const BuyPlansOnline = () => {
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

  const [getCmsServiceSubjectByType, { data: cmsSubjectData, loading: cmsSubjectLoading, error: cmsSubjectError }] =
    useLazyQuery(graphql.queries.getCmsServiceSubjectByType)
  const [description, setDescription] = useState('')
  const [sessionData, setSessionData] = useState([])

  useEffect(() => {
    getCmsServiceSubjectByType({
      variables: { discipline_id: parseInt(router.query.discipline_id), service_type: router.query.service_type },
    })
  }, [getCmsServiceSubjectByType])

  useEffect(() => {
    if (!cmsSubjectError && cmsSubjectData && cmsSubjectData.getCmsServiceSubjectByType) {
      setDescription(cmsSubjectData.getCmsServiceSubjectByType.bono_text || '')
      setSessionData(cmsSubjectData.getCmsServiceSubjectByType.services || [])
    }
  }, [cmsSubjectLoading, cmsSubjectData, cmsSubjectError])

  const handleClickBuy = () => {
    router.push('/purchase-login')
  }
  return (
    <div className={styles.container}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        <div className={'grid grid-cols-12 gap-4'}>
          <div className={'col-span-6'}>
            <div className={styles.title}>Bonos y Sesiones</div>
            <div className={styles.divider} />
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <div className={'col-span-6 flex justify-end z-10'}>
            <CircularMark />
          </div>
        </div>
        <div className={'mt-5 mb-10 grid grid-cols-12 gap-6'}>
          {sessionData.map((item, index) => (
            <div className={'col-span-4'} key={index}>
              <BuyCard data={item} index={index} handleClickBuy={handleClickBuy} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BuyPlansOnline

BuyPlansOnline.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
