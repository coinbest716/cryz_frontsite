import React from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'

// styles
import globalStyles from 'styles/GlobalStyle.module.scss'
import styles from 'pages/dashboard/shopping/order-detail/OrderDetail.module.scss'

const OrderDetail = () => {
  return <div className={globalStyles.dashContainer}>OJO ICON - DETALLE PEDIDO (ORDER DETAIL)</div>
}

export default OrderDetail

OrderDetail.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
