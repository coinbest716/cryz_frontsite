import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// custom components
import Profile from 'components/components/dashboard/Profile'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import CommonButton from 'components/components/dashboard/CommonButton'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'pages/dashboard/shopping/order-detail/OrderDetail.module.scss'

const OrderDetail = () => {
  const handleClickButton = () => {
    console.log('clicked button')
  }
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
      <div className={'w-full flex justify-start mt-11 mb-8'}>
        <div className={'mr-4'}>
          <CommonButton label={'Pagar bono'} bgColor={'#BD5B54'} handleClickButton={() => handleClickButton()} />
        </div>
        <div>
          <CommonButton label={'Comprar bono'} bgColor={'#818E8E'} handleClickButton={() => handleClickButton()} />
        </div>
      </div>
    </div>
  )
}

export default OrderDetail

OrderDetail.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
