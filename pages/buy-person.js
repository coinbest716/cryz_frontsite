import React from 'react'

import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import styles from 'pages/buy-person.module.scss'

const BuyPlansOnline = () => {
  return <div>Buy Plans Online</div>
}

export default BuyPlansOnline

BuyPlansOnline.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
