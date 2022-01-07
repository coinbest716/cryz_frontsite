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
import FileIcon from 'public/images/file-icon.svg'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './OrderItem.module.scss'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

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
  const [purchaseInfo, setPurchaseInfo] = useState({})
  const [billNumber, setBillNumber] = useState(-1)
  const status = 'UNPAID'
  const [getPurchasesFromBillNumber, { data: orderDetailData, loading: orderDetailLoading, error: orderDetailError }] =
    useLazyQuery(graphql.queries.getPurchasesFromBillNumber)

  // handlers
  useEffect(() => {
    setBillNumber(Number(router.query.bill_number))
    getPurchasesFromBillNumber({
      variables: {
        bill_number: Number(router.query.bill_number),
      },
    })
  }, [router.query])

  useEffect(() => {
    if (!orderDetailError && orderDetailData && orderDetailData.getPurchasesFromBillNumber) {
      setPurchaseInfo(orderDetailData.getPurchasesFromBillNumber)
      console.log('!!!!!!!!!!!!!!!', orderDetailData.getPurchasesFromBillNumber)
    }
  }, [orderDetailLoading, orderDetailData, orderDetailError])

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
        <div className={styles.title}>Pedido #{billNumber}</div>
      </div>
      <div className="p-4 flex justify-center mt-40 mb-30">
        <div>
          <div className={styles.billNumber}>PEDIDO 3456</div>
          <div className="flex justify-center">
            <Chip
              data={status === 'PAID' ? OrderStateData[0] : status === 'UNPAID' ? OrderStateData[1] : OrderStateData[2]}
              onClick={() => {}}
            />
          </div>
          <div className={styles.date}>12 /11 /2021</div>
          <div className="flex justify-center">
            <div className={styles.saveButton}>Descargar PDF</div>
          </div>
          <div className="flex justify-center">
            <Image src={FileIcon} width={28} height={28} alt="" />
          </div>
          <div className={styles.price}>129€</div>
          <div className={styles.session}>10 sesiones entrenamiento Bono nutrición</div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem

OrderItem.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
}
