import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './order-success.module.scss'

// images and icons
import successLogo from 'public/images/order-success.svg'

const CreditSuccess = () => {
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

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container}>
          <div className={'flex justify-center items-center h-full'}>
            <div className={styles.creditSection}>
              <div className={styles.title}>¡GRACIAS POR TU COMPRA!</div>
              <div className={'pt-16 text-center'}>
                <Image src={successLogo} alt="" width={270} height={222} />
              </div>
              <div className={'pt-16 ' + styles.orderNumber}>TU NÚMERO DE PEDIDO ES #45486</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreditSuccess

CreditSuccess.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
