import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'

import AcademyDashboardCard from 'components/components/academy/AcademyDashboardCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './academy.module.scss'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Academy = props => {
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

  const [getAcademyWithPlazas, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
    graphql.queries.getAcademyWithPlazas
  )
  const [cardData, setCardData] = useState([])

  // handlers
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
  return viewport !== 'mobile' ? (
    <div className={globalStyles.dashContainer}>
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Mis cursos Academy</div>
        <div className={'flex justify-end'}>
          <NotificationButton />
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-4 lg:gap-8 mb-24'}>
        {cardData?.map((card, index) => (
          <div className={'flex justify-center col-span-6 md:col-span-4'} key={index}>
            <AcademyDashboardCard
              data={card}
              index={index}
              handleClickPayment={handleClickPayment}
              viewport={viewport}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <>Mobile View</>
  )
}

export default Academy

Academy.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Academy">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
