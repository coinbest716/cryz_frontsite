import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
// import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import CommonButton from 'components/components/dashboard/CommonButton'
import Chip from 'components/components/Chip'
import ComprasButton from 'components/components/dashboard/compras/ComprasButton'
import ComprasDetailItem from 'components/components/dashboard/compras/ComprasDetailItem'

import ArrowLeftWhite from 'public/images/arrow-left-white.svg'
// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/dashboard/shopping/order-detail/OrderDetail.module.scss'

// json data
import OrderDetailStateData from 'assets/data/OrderDetailStateData.json'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const OrderDetail = props => {
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
  const { viewport } = props
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [billNumber, setBillNumber] = useState(-1)
  const [purchaseID, setPurchaseID] = useState(-1)
  const [status, setStatus] = useState('PAID')
  const [orderDetailList, setOrderDetailList] = useState([])

  const [
    getSessionsByIdFromDashboard,
    { data: orderDetailData, loading: orderDetailLoading, error: orderDetailError },
  ] = useLazyQuery(graphql.queries.getSessionsByIdFromDashboard)

  // handlers
  useEffect(() => {
    setBillNumber(Number(router.query.bill_number))
    setPurchaseID(Number(router.query.purchase_id))
    setStatus(router.query.status)
    setTitle(router.query.title)
    setPrice(router.query.price)
    setServiceId(router.query.service_id)
  }, [router.query])

  useEffect(() => {
    if (purchaseID !== -1 && purchaseID !== NaN) {
      getSessionsByIdFromDashboard({
        variables: {
          patient_id: Number(localStorage.getItem('patient_id')),
          purchase_id: purchaseID,
        },
      })
    }
  }, [getSessionsByIdFromDashboard, purchaseID])

  useEffect(() => {
    if (!orderDetailError && orderDetailData && orderDetailData.getSessionsByIdFromDashboard) {
      let array = orderDetailData.getSessionsByIdFromDashboard
      let tempArray = []
      array.map(item => {
        let obj = JSON.parse(JSON.stringify(item))
        obj.date = item.date.slice(8, 10) + '/' + item.date.slice(5, 7) + '/' + item.date.slice(0, 4)
        OrderDetailStateData.map((elem, idx) => {
          if (elem.status === item.status) {
            obj.status = elem
          }
        })
        tempArray.push(obj)
      })
      setOrderDetailList(tempArray)
    }
  }, [orderDetailLoading, orderDetailData, orderDetailError])

  const handleClickButton = () => {
    console.log('clicked button')
  }

  const handleBuyAnotherButton = () => {
    router.push(`/purchase?tab=2&service_id=${serviceId}&description=${title}&price=${price}`)
  }

  const handlePayButton = () => {
    router.push(`/purchase?tab=2&service_id=${purchaseID}&description=${title}&price=${price}`)
  }

  const handleClickBack = () => {
    router.push({
      pathname: '/dashboard/shopping/order-item',
      query: {
        bill_number: billNumber,
      },
    })
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div>
          <div className={styles.header + ' p-4 flex flex-col justify-between'}>
            <div
              className="flex justify-start items-center w-fit cursor-pointer"
              style={{ width: 'fit-content' }}
              onClick={handleClickBack}
            >
              <Image src={ArrowLeftWhite} width={18} height={15} alt="" />
              <div className={styles.backString + ' ml-2'}>#{billNumber}</div>
            </div>
            <div className={styles.title}>{title}</div>
          </div>
          <div className="mt-36 mb-32 p-4">
            <div className="flex flex-wrap justify-between">
              <ComprasButton title={'Pagar pedido pendiente'} type={'pending'} />
              <ComprasButton title={'Nuevo bono'} type={'new'} onClick={handleBuyAnotherButton} />
            </div>
            <div className={styles.SessionHeader + ' flex  flex-wrap justify-between mt-4'}>
              <div className={styles.SessionHeaderText}>SESIÓN</div>
              <div className={styles.SessionHeaderText}>ENTRENADOR</div>
              <div className={styles.SessionHeaderText}>FECHA</div>
            </div>
            {orderDetailList.map((item, index) => (
              <div className="mt-1" key={index}>
                <ComprasDetailItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={globalStyles.dashContainer}>
          {/* header part */}
          <div className={'w-full flex flex-wrap justify-between items-center'}>
            <div className={globalStyles.dashTitle}>{title}</div>
            <div className={'flex justify-end'}>
              <NotificationButton />
              {/* <Profile /> */}
            </div>
          </div>
          {/* button part */}
          <div className={'w-full flex justify-start mt-11 mb-8'}>
            {status !== 'PAID' ? (
              <div className={'mr-4'}>
                <CommonButton
                  label={'Pagar pedido pendiente'}
                  bgColor={'#BD5B54'}
                  handleClickButton={() => handlePayButton()}
                />
              </div>
            ) : (
              <></>
            )}
            <div>
              <CommonButton
                label={'Volver a comprar'}
                bgColor={'#818E8E'}
                handleClickButton={() => handleBuyAnotherButton()}
              />
            </div>
          </div>
          {/* table part */}
          <table className={'w-full table-auto'}>
            <thead className={styles.tableHead}>
              <tr>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>SESIÓN</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>ENTRENADOR</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>FECHA</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>ESTADO</div>
                </th>
              </tr>
            </thead>
            <tbody className={'mt-4'}>
              {orderDetailList.map((item, index) => (
                <tr className={index % 2 === 1 ? 'bg-white' : 'bg-transparent'} key={index}>
                  <td>
                    <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{item.session_count}</div>
                  </td>
                  <td>
                    <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                      {item.user.name + ' ' + item.user.lastname}
                    </div>
                  </td>
                  <td>
                    <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{item.date}</div>
                  </td>
                  <td>
                    <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                      <div className={'flex items-end mb-2'}>
                        <Chip data={item.status} onClick={() => {}} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default OrderDetail

OrderDetail.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
