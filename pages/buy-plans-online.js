import React from 'react'

import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import styles from 'pages/buy-person.module.scss'

const BuyPerson = () => {
  return <div>Buy Plans Online</div>
}

export default BuyPerson

BuyPerson.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
