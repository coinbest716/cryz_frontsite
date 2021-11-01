import React from 'react'

import PrimaryLayout from 'components/Layout/PrimaryLayout'

// custom component
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import BuyCard from 'components/components/BuyCard'

// json data
import BuySessionData from 'assets/data/BuySessionData.json'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/buy.module.scss'

const BuyPlansOnline = () => {
  return (
    <div className={styles.container}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        <div className={'grid grid-cols-12 gap-4'}>
          <div className={'col-span-6'}>
            <div className={styles.title}>Bonos y Sesiones</div>
            <div className={styles.divider} />
            <div className={styles.text}>
              Nuestros bonos solo pueden ser utilizados por una persona al mismo tiempo, si quieres mas información
              puedes contactarnos sin compromiso
            </div>
          </div>
          <div className={'col-span-6 flex justify-end z-10'}>
            <CircularMark />
          </div>
        </div>
        <div className={'mt-5 mb-10 grid grid-cols-12 gap-6'}>
          {BuySessionData.map((item, index) => (
            <div className={'col-span-4'} key={index}>
              <BuyCard data={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BuyPlansOnline

BuyPlansOnline.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
