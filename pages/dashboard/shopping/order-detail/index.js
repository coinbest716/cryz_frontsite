import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import router from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
// import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import CommonButton from 'components/components/dashboard/CommonButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/dashboard/shopping/order-detail/OrderDetail.module.scss'

// json data
import OrderDetailStateData from 'assets/data/OrderDetailStateData.json'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const OrderDetail = () => {
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
  const [purchaseID, setPurchaseID] = useState(-1)
  const [orderDetailList, setOrderDetailList] = useState([])

  const [
    getSessionsByIdFromDashboard,
    { data: orderDetailData, loading: orderDetailLoading, error: orderDetailError },
  ] = useLazyQuery(graphql.queries.getSessionsByIdFromDashboard)

  // handlers
  useEffect(() => {
    setPurchaseID(Number(router.query.purchase_id))
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
  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Bono 10 sesiones Preparación parto</div>
        <div className={'flex justify-end'}>
          <NotificationButton />
          {/* <Profile /> */}
        </div>
      </div>
      {/* button part */}
      <div className={'w-full flex justify-start mt-11 mb-8'}>
        <div className={'mr-4'}>
          <CommonButton label={'Pagar bono'} bgColor={'#BD5B54'} handleClickButton={() => handleClickButton()} />
        </div>
        <div>
          <CommonButton label={'Comprar bono'} bgColor={'#818E8E'} handleClickButton={() => handleClickButton()} />
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
            <tr className={index % 2 === 0 ? 'bg-white' : 'bg-transparent'} key={index}>
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
  )
}

export default OrderDetail

OrderDetail.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
