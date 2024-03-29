import React, { useEffect, useState } from 'react'

// third party components
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/Dashboard/NotificationButton'
import Chip from 'components/components/Chip'
import ComprasItem from 'components/Dashboard/compras/ComprasItem'
import ComprasButton from 'components/Dashboard/compras/ComprasButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './shopping.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'
import ArrowLeftWhite from 'public/images/arrow-left-white.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Shopping = props => {
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
  const [
    getPurchasedOnlinePlanList,
    { data: purchasedOnlinePlanListData, loading: purchasedOnlinePlanListLoading, error: purchasedOnlinePlanListError },
  ] = useLazyQuery(graphql.queries.getPurchasedOnlinePlanList)

  const [onlinePlanList, setOnlinePlanList] = useState([])

  const [CancelOnlinePlanSubscriptionByDashboard] = useMutation(
    graphql.mutations.CancelOnlinePlanSubscriptionByDashboard
  )

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
  }, [router, getPatientByEmail])

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
        getPurchasedOnlinePlanList({
          variables: {
            patient_id: personalData.getPatientByEmail.id,
          },
        })
      }
    }
  }, [
    router,
    selectedYear,
    getServicePurchaseByDashboard,
    getPurchasedOnlinePlanList,
    personalLoading,
    personalData,
    personalError,
  ])

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

  useEffect(() => {
    if (
      !purchasedOnlinePlanListError &&
      purchasedOnlinePlanListData &&
      purchasedOnlinePlanListData.getPurchasedOnlinePlanList
    ) {
      setOnlinePlanList(purchasedOnlinePlanListData.getPurchasedOnlinePlanList)
    }
  }, [purchasedOnlinePlanListLoading, purchasedOnlinePlanListData, purchasedOnlinePlanListError])

  const handleChange = event => {
    setSelectedYear(Number(event.target.value))
  }

  const handleGotoOrderDetail = (item, detail) => {
    router.push(
      '/dashboard/shopping/order-detail?bill_number=' +
        item.bill_number +
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

  const handleCancelSubscription = item => {
    CancelOnlinePlanSubscriptionByDashboard({
      variables: { purchase_id: item.id },
    })
      .then(response => {
        if (response.data.CancelOnlinePlanSubscriptionByDashboard) {
          toast.success(item.item_name + ' is cancelled successfully.')
          getPurchasedOnlinePlanList({
            variables: {
              patient_id: Number(localStorage.getItem('patient_id')),
            },
          })
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  const download = (fileUrl, fileName) => {
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  const handleClickBack = () => {
    router.push('/dashboard/profile#main', undefined, { shallow: true })
  }

  const handleClickComprasItem = bill_number => {
    router.push({
      pathname: '/dashboard/shopping/order-item',
      query: {
        bill_number: bill_number,
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
              <div className={styles.backString + ' ml-2'}>Perfil</div>
            </div>
            <div className={styles.title}>Compras</div>
          </div>
          <div className="mt-36 mb-36 p-4">
            <div>
              {shoppingData.map((item, index) => (
                <ComprasItem data={item} handleClickComprasItem={handleClickComprasItem} key={index} />
              ))}
            </div>
            {onlinePlanList.map((item, index) => (
              <div className="mt-6" key={index}>
                <ComprasButton title={'Anular Subcripción: '} description={item.item_name} type={'subscription'} />
              </div>
            ))}
          </div>
        </div>
      ) : (
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
          <div
            style={{
              height: onlinePlanList.length !== 0 ? 'calc(100vh - 390px)' : 'calc(100vh - 312px)',
              overflow: 'auto',
            }}
          >
            <PerfectScrollbar>
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
                              <div
                                key={idx}
                                className={'flex cursor-pointer'}
                                onClick={() => handleGotoOrderDetail(item, detail)}
                              >
                                <Image src={FileViewIcon} alt={''} width={29} height={29} />
                                <div className={'ml-5'}>{detail.item_name}</div>
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
                            <span className={styles.payment}>{item.status === 'PAID' ? item.purchase_type : ''}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableContentArea + ' items-center'}>
                          {item.download_url !== '' && (
                            <button
                              className={
                                'w-10 h-10 duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'
                              }
                              onClick={() => download(item.download_url, 'invoice.pdf')}
                            >
                              <Image src={DownloadIcon} alt={''} width={18} height={22} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PerfectScrollbar>
          </div>
          <div className={'w-full flex justify-end mt-6'}>
            {onlinePlanList.map((item, index) => (
              <button
                key={index}
                className={'bg-transparent flex items-center mx-3 px-4 ' + styles.outlineButton}
                onClick={() => handleCancelSubscription(item)}
              >
                <p>
                  <strong>Anular subscripción: </strong> {item.item_name}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default Shopping

Shopping.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Compras">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
