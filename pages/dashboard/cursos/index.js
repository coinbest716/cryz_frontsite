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
import router from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './cursos.module.scss'

// images
import FileViewIcon from 'assets/images/file-view.svg'
import DownloadIcon from 'assets/images/download.svg'
import DownloadDisableIcon from 'assets/images/download-disable.svg'

// json data
import OrderStateData from 'assets/data/OrderStateData.json'

// graphql
import { useLazyQuery, useMutation } from '@apollo/client'
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
        getPurchasedOnlinePlanList({
          variables: {
            patient_id: personalData.getPatientByEmail.id,
          },
        })
      }
    }
  }, [
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
      console.log(tempArray)
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
    console.log(detail)
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

  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Curso básico de entrenamiento durante el embarazo</div>
       
        <div className={styles.tableCellText}>
          {/* year select part */}
      <div className={styles.yearArea}>
        
        </div>
        {/* table part */}
                      <div className={'inline-grid'}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam felis ac odio fermentum scelerisque. Vestibulum tempor pretium turpis, eu ullamcorper erat. Sed fermentum magna felis, in posuere nulla ornare a. Etiam lobortis consequat libero eget rutrum. Fusce et pretium justo, et fringilla massa. Vestibulum molestie sollicitudin leo et volutpat. Suspendisse elementum sodales dolor ac luctus. Fusce dignissim justo sem, ut efficitur nibh sodales non. In feugiat mollis nunc, in cursus arcu tempus imperdiet. Cras mollis dui semper sagittis tempor. Phasellus rhoncus, velit eu eleifend gravida, nulla mauris molestie tortor, et feugiat ex turpis in lorem. Quisque imperdiet vulputate condimentum. Praesent laoreet tortor venenatis velit malesuada, non fringilla mi pulvinar. Etiam ut mattis leo. Etiam commodo id felis eget faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                      </div>
                    </div>
        </div>
      {/* year select part */}
      <div className={styles.yearArea}>
        
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
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>LECCIÓN</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>DETALLE</div>
                </th>
                <th>
                  <div className={styles.tableHeadArea + ' ' + styles.tableHeadTitle}>FECHA</div>
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
                      <div className={'flex items-start'}>1</div>
                  
                    </div>
                  </td>
                  <td>
                    <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                      <div className={'inline-grid'}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam felis ac odio fermentum scelerisque. Vestibulum tempor pretium turpis, eu ullamcorper erat. Sed fermentum magna felis, in posuere nulla ornare a. Etiam lobortis consequat libero eget rutrum. Fusce et pretium justo, et fringilla massa. Vestibulum molestie sollicitudin leo et volutpat. Suspendisse elementum sodales dolor ac luctus. Fusce dignissim justo sem, ut efficitur nibh sodales non. In feugiat mollis nunc, in cursus arcu tempus imperdiet. Cras mollis dui semper sagittis tempor. Phasellus rhoncus, velit eu eleifend gravida, nulla mauris molestie tortor, et feugiat ex turpis in lorem. Quisque imperdiet vulputate condimentum. Praesent laoreet tortor venenatis velit malesuada, non fringilla mi pulvinar. Etiam ut mattis leo. Etiam commodo id felis eget faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                      </div>
                    </div>
                  </td>
                  <td className={'h-full relative'}>
                    <div
                      className={
                        'absolute top-0 bottom-0 flex flex-col justify-around ' +
                        styles.tableContentArea +
                        ' ' +
                        styles.tableCellText
                      }
                    >
                      <Image src={FileViewIcon} alt={''} width={29} height={29} />
                  
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PerfectScrollbar>
      </div>
      
    </div>
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
