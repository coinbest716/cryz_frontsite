import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import Chip from 'components/components/Chip'

import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
import FileIcon from 'public/images/file-icon.svg'

// styles
import styles from './OrderItem.module.scss'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

import moment from 'moment'
// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const OrderItem = props => {
  const { viewport } = props
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (Number(router.query.bill_number) && viewport !== 'mobile') {
      router.push('/dashboard/shopping')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport])

  useEffect(() => {
    if (!orderDetailError && orderDetailData && orderDetailData.getPurchasesFromBillNumber) {
      setPurchaseInfo(orderDetailData.getPurchasesFromBillNumber)
    }
  }, [orderDetailLoading, orderDetailData, orderDetailError])

  const handleClickBack = () => {
    router.push('/dashboard/shopping', undefined, { shallow: true })
  }

  const handleClickDownload = (fileUrl, fileName) => {
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  const handleGotoOrderDetail = detail => {
    router.push(
      '/dashboard/shopping/order-detail?bill_number=' +
        billNumber +
        '&purchase_id=' +
        detail.id +
        '&status=' +
        detail.status +
        '&title=' +
        detail.item_web_name +
        '&price=' +
        detail.price +
        '&service_id=' +
        detail.item_id
    )
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
      <div className="p-4 flex justify-center mt-36 mb-30">
        <div className="mt-8">
          <div className={styles.billNumber}>PEDIDO {billNumber}</div>
          <div className="flex justify-center mt-4">
            <Chip
              data={
                purchaseInfo.status === 'PAID'
                  ? OrderStateData[0]
                  : purchaseInfo.status === 'UNPAID'
                  ? OrderStateData[1]
                  : OrderStateData[2]
              }
              onClick={() => {}}
            />
          </div>
          <div className={styles.date + ' mt-4'}>{moment(purchaseInfo.purchase_date).format('DD/MM/YYYY')}</div>
          <div className={styles.price + ' mt-4'}>{purchaseInfo.price}€</div>
          {purchaseInfo.download_url === '' ? (
            <></>
          ) : (
            <div className="flex justify-center mt-10">
              <div
                className={styles.saveButton}
                onClick={() => handleClickDownload(purchaseInfo.download_url, billNumber)}
              >
                Descargar PDF
              </div>
            </div>
          )}
          <div className="mt-10">
            {purchaseInfo.purchases?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-center mt-8">
                  <Image src={FileIcon} width={28} height={28} alt="" onClick={() => handleGotoOrderDetail(item)} />
                </div>
                <div className={styles.session}>{item.item_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem

OrderItem.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
}
