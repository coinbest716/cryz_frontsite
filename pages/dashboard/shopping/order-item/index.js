import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
// import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import CommonButton from 'components/components/dashboard/CommonButton'
import Chip from 'components/components/Chip'

import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './OrderItem.module.scss'

// json data
import OrderDetailStateData from 'assets/data/OrderDetailStateData.json'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const OrderItem = () => {
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
  const [billNumber, setBillNumber] = useState(-1)

  const [
    getSessionsByIdFromDashboard,
    { data: orderDetailData, loading: orderDetailLoading, error: orderDetailError },
  ] = useLazyQuery(graphql.queries.getSessionsByIdFromDashboard)

  // handlers
  useEffect(() => {
    setBillNumber(Number(router.query.bill_number))
  }, [router.query])

  const handleClickBack = () => {
    router.push('/dashboard/shopping', undefined, { shallow: true })
  }

  return (
    <div>
      <div className={styles.header + ' p-4 flex flex-col justify-between'}>
        <div
          className="flex justify-start items-center w-fit cursor-pointer"
          style={{ width: 'fit-content' }}
          onClick={handleClickBack}
        >
          <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
          <div className={styles.backString + ' ml-2'}>Compras</div>
        </div>
        <div className={styles.title}>#{billNumber}</div>
      </div>
    </div>
  )
}

export default OrderItem

OrderItem.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
}
