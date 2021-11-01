import React from 'react'

import PrimaryLayout from 'components/Layout/PrimaryLayout'

// next components
import Image from 'next/image'

// images
import ErrorImage from 'assets/images/error.png'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/404.module.scss'

const Custom404 = () => {
  return (
    <div className={'w-full flex justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.container}>
          <div className={styles.title}>ERROR 404</div>
          <div className={styles.divider} />
          <div className={'flex justify-center mb-56'}>
            <Image src={ErrorImage} width={388} height={321} alt="" />
            <div className={'block ' + styles.textArea}>
              <div className={styles.subTitle}>NOS HEMOS CAIDO</div>
              <div className={styles.text}>
                Ha sido un imprevisto, pero estamos
                <br />
                trabajando para solucionarlo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Custom404

Custom404.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
