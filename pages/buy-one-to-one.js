import React from 'react'

import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import styles from 'pages/buy-one-to-one.module.scss'

const BuyOneToOne = () => {
  return <div>Buy One to One Streaming</div>
}

export default BuyOneToOne

BuyOneToOne.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
