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
import failedLogo from 'public/images/order-failed.png'

const CreditSuccess = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const { viewport } = props

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
    <>
      {viewport === 'mobile' ? (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.m_container}>
            <div className={globalStyles.container}>
              <div className={'flex justify-center h-full'}>
                <div className={styles.creditSection}>
                  <div className={'mt-14 ' + styles.m_title}>¡HA HABIDO UN PROBLEMA PROCESANDO TU PEDIDO! </div>
                  <div className={'px-24 py-12 text-center'}>
                    <Image src={failedLogo} alt="" width={270} height={245} />
                  </div>
                  <div className={styles.m_orderNumber}>INTÉNTALO DE NUEVO O PONTE EN CONTACTO CON NOSOTROS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container}>
              <div className={'flex justify-center items-center h-full'}>
                <div className={styles.creditSection}>
                  <div className={styles.title}>¡HA HABIDO UN PROBLEMA PROCESANDO TU PEDIDO! </div>
                  <div className={'pt-16 text-center'}>
                    <Image src={failedLogo} alt="" width={270} height={245} />
                  </div>
                  <div className={'pt-16 ' + styles.orderNumber}>
                    INTÉNTALO DE NUEVO O PONTE EN CONTACTO CON NOSOTROS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default CreditSuccess

CreditSuccess.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
