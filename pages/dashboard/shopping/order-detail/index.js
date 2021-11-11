import React from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import CommonButton from 'components/components/dashboard/CommonButton'
import Chip from 'components/components/Chip'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/dashboard/shopping/order-detail/OrderDetail.module.scss'

// json data
import OrderDetailData from 'assets/data/OrderDetailData.json'
import OrderDetailStateData from 'assets/data/OrderDetailStateData.json'

const OrderDetail = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  const handleClickButton = () => {
    console.log('clicked button')
  }
  return (
    <div className={globalStyles.dashContainer}>
      {/* header part */}
      <div className={'w-full flex flex-wrap justify-between items-center'}>
        <div className={globalStyles.dashTitle}>Bono 10 sesiones Preparación parto</div>
        <div className={'flex justify-end'}>
          <div className={'mr-8'}>
            <NotificationButton />
          </div>
          <div>
            <Profile />
          </div>
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
          {OrderDetailData.map((item, index) => (
            <tr className={index % 2 === 0 ? 'bg-white' : 'bg-transparent'} key={index}>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{item.session}</div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{item.trainer}</div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>{item.date}</div>
              </td>
              <td>
                <div className={styles.tableContentArea + ' ' + styles.tableCellText}>
                  <div className={'flex items-end mb-2'}>
                    <Chip data={OrderDetailStateData[item.orderState]} onClick={() => {}} />
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
