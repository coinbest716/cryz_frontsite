import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import AcademyCard from 'components/components/academy/AcademyCard'
import CircularMark from 'components/components/CircularMark'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './academy.module.scss'
// json data
import AcademyData from 'assets/data/AcademyData'

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

  const router = useRouter()
  const [getAcademy, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
    graphql.queries.getAcademy
  )
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    getAcademy({
      variables: {
        nameId: [],
        type: 'ALL',
      },
    })
  }, [])

  useEffect(() => {
    if (!mainError && mainData && mainData.getAcademy) {
      setCardData(mainData.getAcademy)
    }
  }, [mainLoading, mainData, mainError])

  const handleClickPayment = data => {
    dispatch({ type: 'set', isLoading: true })
    router.push({
      pathname: `/academy/${data.id}`,
      query: { id: data.id },
    })
  }

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globlaStyle.container}>
          <div className={'flex justify-between pt-28'}>
            <div>
              <div className={styles.topTitle}>Academy</div>
              <div className={styles.topDash} />
            </div>
            <div>
              <div className={'z-10'}>
                <CircularMark />
              </div>
            </div>
          </div>
          <div className={styles.cardTitle + ' mb-5'}>Destacados</div>
          <div className={'grid grid-cols-12 gap-12 mb-24'}>
            {cardData?.map((card, index) => (
              <div className={'col-span-12 flex  md:col-span-4 sm:col-span-12 ' + styles.cardAlign} key={index}>
                <AcademyCard data={card} index={index} handleClickPayment={handleClickPayment} />
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
