import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './confirmacion.module.scss'

// images and icons
import successLogo from 'public/images/order-success.svg'

const Confirmacion = () => {
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
  const router = useRouter()
  const [paymentIntent, setPaymentIntent] = useState('')
  const [paymentIntentClient, setPaymentIntentClient] = useState('')
  const [sourceRedirect, setSourceRedirect] = useState('')
  const [sourceType, setSourceType] = useState('')
  useEffect(() => {
    if (router.query.payment_intent) {
      setPaymentIntent(decodeURIComponent(JSON.parse(`"${router.query.payment_intent}"`)))
    }
    if (router.query.payment_intent_client_secret) {
      setPaymentIntentClient(decodeURIComponent(JSON.parse(`"${router.query.payment_intent_client_secret}"`)))
    }
    if (router.query.source_redirect_slug) {
      setSourceRedirect(decodeURIComponent(JSON.parse(`"${router.query.source_redirect_slug}"`)))
    }
    if (router.query.source_type) {
      setSourceType(decodeURIComponent(JSON.parse(`"${router.query.source_type}"`)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container}>
          <div className={'flex justify-center items-center h-full'}>
            <div className={'grid grid-cols-12 gap-4 '}>
              <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
                <div className={'pt-2 pl-8 ' + styles.billAddress}>
                  <div className="mt-2">paymentIntent</div>
                  <div>{paymentIntent}</div>
                  <div className="mt-2">paymentIntentClient</div>
                  <div>{paymentIntentClient}</div>
                  <div className="mt-2">sourceRedirect</div>
                  <div>{sourceRedirect}</div>
                  <div className="mt-2">sourceType</div>
                  <div>{sourceType}</div>
                </div>
              </div>
              <div className={'col-span-12 md:col-span-6 sm:col-span-12'}>
                <div className={styles.creditSection}>
                  <div className={styles.title}>¡HA HABIDO UN PROBLEMA PROCESANDO TU COMPRA!</div>
                  <div className={'pt-16 text-center'}>
                    <Image src={successLogo} alt="" width={270} height={222} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Confirmacion

Confirmacion.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
