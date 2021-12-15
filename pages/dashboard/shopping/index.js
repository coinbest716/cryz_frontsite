import React, { useEffect, useState } from 'react'

// third party components
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './shopping.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Shopping = () => {
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
  const [yearList, setYearList] = useState([])

  useEffect(() => {
    let array = []
    let object = {}
    object.id = 0
    object.year = 'Todo'
    object.value = 0
    array.push(object)
    for (let i = 1900; i < 2100; i++) {
      let obj = {}
      obj.id = i
      obj.year = i
      obj.value = i
      array.push(obj)
    }
    setYearList(array)
  }, [])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [shoppingData, setShoppingData] = useState([])

  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )

  const [getServicePurchaseByDashboard, { data: billingData, loading: billingLoading, error: billingError }] =
    useLazyQuery(graphql.queries.getServicePurchaseByDashboard)

  // handlers
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(response => {
        if (response?.attributes?.email) {
          getPatientByEmail({
            variables: {
              email: response.attributes.email,
            },
          })
        }
      })
      .catch(error => {
        toast.error(error.message)
        router.push('/')
      })
  }, [getPatientByEmail])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      if (personalData === null) {
        toast.error('Please insert your personal information in Profile page.')
        router.push('/dashboard/profile')
      } else {
        getServicePurchaseByDashboard({
          variables: {
            patient_id: personalData.getPatientByEmail.id,
            year: selectedYear,
          },
        })
      }
    }
  }, [selectedYear, getServicePurchaseByDashboard, personalLoading, personalData, personalError])

  useEffect(() => {
    if (!billingError && billingData && billingData.getServicePurchaseByDashboard) {
      let array = billingData.getServicePurchaseByDashboard
      let tempArray = []
      array.map(item => {
        let obj = JSON.parse(JSON.stringify(item))
        obj.purchase_date =
          item.purchase_date.slice(8, 10) + '/' + item.purchase_date.slice(5, 7) + '/' + item.purchase_date.slice(0, 4)
        tempArray.push(obj)
      })
      setShoppingData(tempArray)
    } else {
      setShoppingData([])
    }
  }, [billingLoading, billingData, billingError])

  const handleChange = event => {
    setSelectedYear(Number(event.target.value))
  }

  const handleGotoOrderDetail = () => {
    router.push('/dashboard/shopping/order-detail')
  }

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Compras</div>
        <div className={'flex justify-end'}>
          <NotificationButton />
          {/* <Profile /> */}
        </div>
      </div>
      {/* year select part */}
      <div className={styles.yearArea}>
        <select
          name="select"
          onChange={handleChange}
          value={selectedYear}
          className={'cursor-pointer flex justify-start items-center ' + styles.yearSelect}
        >
          {yearList.map((item, index) => (
            <option key={index} value={item.value}>
              {item.year}
            </option>
          ))}
        </select>
      </div>
      {/* table part */}
      <table className={'w-full table-auto'}>
        <thead className={styles.tableHead}>
          <tr>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>PEDIDO</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>FECHA</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>PRECIO</div>
            </th>
            <th>
              <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>PDF</div>
            </th>
          </tr>
        </thead>
        <tbody className={'mt-4 ' + styles.tbody}>
          {shoppingData.map((item, index) => (
            <tr key={index} className={index % 2 === 1 ? 'bg-white' : ''}>
              <td className={'h-full relative'}>
                <div
                  className={
                    'absolute top-0 bottom-0 flex flex-col justify-around ' +
                    styles.tableContentArea +
                    ' ' +
                    styles.tableCellText
                  }
                >
                  <div className={'flex items-start'}>#{item.bill_number}</div>
                  <div className={'flex items-end mb-2'}>
                    <Chip
                      data={
                        item.status === 'PAID'
                          ? OrderStateData[0]
                          : item.status === 'UNPAID'
                          ? OrderStateData[1]
                          : OrderStateData[2]
                      }
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                  <div className={'inline-grid'}>
                    {item.purchases.map((detail, idx) => (
                      <div key={idx} className={'flex cursor-pointer'} onClick={() => handleGotoOrderDetail()}>
                        <Image src={FileViewIcon} alt={''} width={29} height={29} />
                        <div className={'ml-5'}>{detail.item_web_name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{item.purchase_date}</div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                  <div className={'inline-grid'}>
                    <span className={styles.price}>{item.price}€</span>
                    <span className={styles.payment}>Paypal</span>
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                  <Image src={item.sent_invoice ? DownloadIcon : DownloadDisableIcon} alt={''} width={18} height={22} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={'w-full flex justify-end mt-6'}>
        <button className={'bg-transparent flex items-center mx-3 px-4 ' + styles.outlineButton} onClick={() => {}}>
          <p>
            <strong>Anular subscripción: </strong> Plan online menopausia
          </p>
        </button>
        <button className={'bg-transparent flex items-center mx-3 px-4 ' + styles.outlineButton} onClick={() => {}}>
          <p>
            <strong>Anular subscripción: </strong> Plan integral online nutrición
          </p>
        </button>
      </div>
    </div>
  )
}
export default Shopping

Shopping.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
