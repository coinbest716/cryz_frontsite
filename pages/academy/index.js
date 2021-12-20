import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// third party components
import { isMobile } from 'react-device-detect'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import AcademyCard from 'components/components/academy/AcademyCard'
import CircularMark from 'components/components/CircularMark'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './academy.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Academy = () => {
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
  const [mobile, setMobile] = useState(false)
  // const [getAcademy, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
  //   graphql.queries.getAcademy
  // )
  const [getAcademyWithPlazas, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
    graphql.queries.getAcademyWithPlazas
  )
  const [cardData, setCardData] = useState([])

  // handlers
  useEffect(() => {
    setMobile(isMobile)
  }, [isMobile])
  useEffect(() => {
    getAcademyWithPlazas()
  }, [getAcademyWithPlazas])

  useEffect(() => {
    if (!mainError && mainData && mainData.getAcademyWithPlazas) {
      setCardData(mainData.getAcademyWithPlazas)
    }
  }, [mainLoading, mainData, mainError])

  const handleClickPayment = data => {
    dispatch({ type: 'set', isLoading: true })
    router.push(`/academy/${data.id}`)
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container}>
          <div className={'flex justify-between pt-7 lg:pt-28'}>
            <div>
              <div className={styles.topTitle}>Academy</div>
              <div className={styles.topDash + ' mt-2 mb-3'} />
            </div>
            {!mobile && (
              <div className={'z-10'}>
                <CircularMark />
              </div>
            )}
          </div>
          {!mobile && <div className={styles.cardTitle + ' mb-5'}>Destacados</div>}
          <div className={'grid grid-cols-12 gap-4 lg:gap-8 mb-24'}>
            {cardData?.map((card, index) => (
              <div className={'flex justify-center col-span-6 md:col-span-4'} key={index}>
                <AcademyCard data={card} index={index} handleClickPayment={handleClickPayment} mobile={mobile} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Academy

Academy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
