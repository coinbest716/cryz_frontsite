import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// custom components
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'pages/dashboard/shopping/order-detail/OrderDetail.module.scss'

const OrderDetail = () => {
  return (
    <div className={globalStyles.dashContainer}>
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
    </div>
  )
}

export default OrderDetail

OrderDetail.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
