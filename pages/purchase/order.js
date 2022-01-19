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
import styles from './order-success.module.scss'

// images and icons
import successLogo from 'public/images/order-success.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import ShoppingCart from 'components/purchase/ShoppingCart'

import * as gtag from '../../utils/gtag'

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
  const router = useRouter()
  const [checkoutVerify, { data: orderData, loading: orderLoading, error: orderError }] = useLazyQuery(
    graphql.queries.checkoutVerify
  )
  const [orderInfo, setOrderInfo] = useState(null)
  useEffect(() => {
    if (router.query.payment_intent || router.query.subscription_intent || router.query.purchase_id) {
      checkoutVerify({
        variables: {
          intentId: decodeURIComponent(JSON.parse(`"${router.query.payment_intent}"`)),
          subscriptionId: decodeURIComponent(JSON.parse(`"${router.query.subscription_id}"`)),
          purchaseId: decodeURIComponent(JSON.parse(`"${router.query.purchase_id}"`)),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    if (!orderError && orderData && orderData.checkoutVerify) {
      const data = orderData.checkoutVerify
      gtag.event({
        action: 'purchase',
        params: {
          transaction_id: data.id,
          affiliation: 'Crys Dyaz & Co',
          value: data.price,
          currency: 'EUR',
          tax: parseFloat(data.item_iva) / 100.0 + 1,
          shipping: 0,
          items: [
            {
              id: data.item_id,
              name: data.item_name,
              list_name: data.item_web_name,
              brand: 'Crys Dyaz & Co',
              category: 'Services',
              quantity: 1,
              price: data.price,
            },
          ],
        },
      })
      setOrderInfo(data)
    }
  }, [orderLoading, orderData, orderError])

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container} style={{ maxWidth: '500px' }}>
            <div className="px-24 py-6 flex justify-center">
              <Image src={successLogo} alt={''} width={320} height={320} />
            </div>
            <div className="my-4">
              <div className={styles.m_title}>GRACIAS, tu pedido ha sido recibido.</div>
              <div className={'pt-8'}>
                <div className={'flex'}>
                  <p className={'font-bold ' + styles.m_detail}>NÚMERO DE PEDIDO:</p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;#{orderInfo?.id}</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.m_detail}>SERVICIO: </p>
                  <p className={styles.detail}>&nbsp;&nbsp;&nbsp;{orderInfo?.item_name}</p>
                </div>
                <div className={'flex pt-3'}>
                  <p className={'font-bold ' + styles.m_detail}>TOTAL:</p>
                  <p className={styles.m_detail}>&nbsp;&nbsp;&nbsp;{orderInfo?.price}€</p>
                </div>
              </div>

              {router.query.purchase_id && (
                <>
                  <div className={'pt-8 ' + styles.description}>
                    Para agilizar tu pedido, puede hacernos llegar el justificante de la transferencia indicando el
                    número de pedido a la siguiente dirección de email: administracion@crysdyazandco.com
                    <br /> <br />
                    Una vez recibida la justificación, se pondrá su pedido en proceso
                  </div>
                  <div className={'pt-10 font-bold ' + styles.m_detail}>Detalles bancarios</div>
                  <div className={'mt-4 px-6 py-4 ' + styles.detailBank}>
                    <div className={'flex'}>
                      <p className={'font-bold ' + styles.m_detail}>NOMBRE:</p>
                      <p className={styles.m_detail}>&nbsp;&nbsp;&nbsp;CRODY SALUD</p>
                    </div>
                    <div className={'flex pt-3'}>
                      <p className={'font-bold ' + styles.m_detail}>BANCO:</p>
                      <p className={styles.m_detail}>&nbsp;&nbsp;&nbsp;LA CAIXA</p>
                    </div>
                    <div className={'flex pt-3'}>
                      <p className={'font-bold ' + styles.m_detail}>NºCUENTA: </p>
                      <p className={styles.m_detail}>&nbsp;&nbsp;&nbsp;ES27 2100 9201 4202 0013 0103</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center items-center mt-10 mb-7">
              <div
                className={styles.goButton + ' cursor-pointer'}
                onClick={() => {
                  router.push('/dashboard/shopping')
                }}
              >
                Ver compra
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' pt-20'}>
              <div className={'grid grid-cols-12 gap-4 '}>
                <div className={'col-span-12 md:col-span-8 sm:col-span-12 p-5 pb-14'}>
                  <div className={styles.title}>GRACIAS, tu pedido ha sido recibido.</div>
                  <div className={'pt-12'}>
                    <div className={'flex'}>
                      <p className={'font-bold ' + styles.detail}>NÚMERO DE PEDIDO:</p>
                      <p className={styles.detail}>&nbsp;&nbsp;&nbsp;#{orderInfo?.id}</p>
                    </div>
                    <div className={'flex pt-3'}>
                      <p className={'font-bold ' + styles.detail}>SERVICIO: </p>
                      <p className={styles.detail}>&nbsp;&nbsp;&nbsp;{orderInfo?.item_name}</p>
                    </div>
                    <div className={'flex pt-3'}>
                      <p className={'font-bold ' + styles.detail}>TOTAL:</p>
                      <p className={styles.detail}>&nbsp;&nbsp;&nbsp;{orderInfo?.price}€</p>
                    </div>
                  </div>
                  <div className={'col-span-12 md:col-span-4 sm:col-span-12'}></div>
                  {router.query.purchase_id && (
                    <>
                      <div className={'pt-10 ' + styles.description}>
                        Para agilizar tu pedido, puede hacernos llegar el justificante de la transferencia indicando el
                        número de pedido a la siguiente dirección de email: administracion@crysdyazandco.com
                        <br /> <br />
                        Una vez recibida la justificación, se pondrá su pedido en proceso
                      </div>
                      <div className={'pt-10 font-bold ' + styles.detail}>Detalles bancarios</div>
                      <div className={'mt-4 px-6 py-4 ' + styles.detailBank}>
                        <div className={'flex'}>
                          <p className={'font-bold ' + styles.detail}>NOMBRE:</p>
                          <p className={styles.detail}>&nbsp;&nbsp;&nbsp;CRODY SALUD</p>
                        </div>
                        <div className={'flex pt-3'}>
                          <p className={'font-bold ' + styles.detail}>BANCO:</p>
                          <p className={styles.detail}>&nbsp;&nbsp;&nbsp;LA CAIXA</p>
                        </div>
                        <div className={'flex pt-3'}>
                          <p className={'font-bold ' + styles.detail}>NºCUENTA: </p>
                          <p className={styles.detail}>&nbsp;&nbsp;&nbsp;ES27 2100 9201 4202 0013 0103</p>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex justify-start items-center mt-10 mb-5">
                    <div
                      className={styles.goButton + ' cursor-pointer'}
                      onClick={() => {
                        router.push('/dashboard/shopping')
                      }}
                    >
                      Ver compra
                    </div>
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
