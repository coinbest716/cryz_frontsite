import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom component
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import CircularMark from 'components/components/CircularMark'
import BuyCard from 'components/components/BuyCard'
import MobileBuyCard from 'components/components/MobileBuyCard'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/buy/index.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import { Auth } from 'aws-amplify'
import * as gtag from '../../../../utils/gtag'

const BuyOneToOne = props => {
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

  // variables
  const { viewport } = props
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [sessionData, setSessionData] = useState([])

  const handleClickBuy = (service_id, description, price) => {
    gtag.event({
      action: 'select_content',
      params: {
        content_type: 'product',
        items: [
          {
            id: service_id,
            name: description,
            brand: 'Crys Dyaz & Co',
            quantity: 1,
            price: price,
          },
        ],
      },
    })
    Auth.currentAuthenticatedUser()
      .then(() => {
        router.push({
          pathname: '/purchase',
          query: { service_id: service_id, tab: 0, image: router.query.image, description: description, price: price },
        })
      })
      .catch(() => {
        router.push({
          pathname: '/purchase-login',
          query: { service_id: service_id, tab: 0, image: router.query.image, description: description, price: price },
        })
      })
  }
  return (
    <div className={viewport === 'mobile' ? styles.m_container : styles.container}>
      <div className={globalStyles.container}>
        <div className={viewport === 'mobile' ? styles.m_backButtonArea : styles.backButtonArea}>
          <BackButton />
        </div>
        {viewport === 'mobile' ? (
          <div>
            <div className={styles.m_title}>Bonos y Sesiones</div>
            <div className={styles.m_divider} />
            <div className={globalStyles.tinyMCEClass}>
              <div className={'tinymce-class'}>
              <p>
                Si estás dudando cuáles de estos planes se ajustan más a tus necesidades, ponte en contacto con nuestro equipo de especialistas para que te asesoren. 
              </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-6'}>
              <div className={styles.title}>Bonos y Sesiones</div>
              <div className={styles.divider} />
              <div className={globalStyles.tinyMCEClass}>
                <div className={'tinymce-class'}>
                <p>
                  Si estás dudando cuáles de estos planes se ajustan más a tus necesidades, ponte en contacto con nuestro equipo de especialistas para que te asesoren. 
               </p>
                </div>
              </div>
            </div>
            <div className={'col-span-6 flex justify-end z-10'}>
              <CircularMark viewport={viewport} />
            </div>
          </div>
        )}
        {viewport === 'mobile' ? (
          <div className={'mt-10 mb-6 grid grid-cols-12 gap-4'}>
            {sessionData.map((item, index) => (
              <div className={'col-span-12'} key={index}>
                <MobileBuyCard data={item} index={index} handleClickBuy={handleClickBuy} />
              </div>
            ))}
          </div>
        ) : (
          <div className={'mt-5 mb-10 grid grid-cols-12 gap-6'}>
            {sessionData.map((item, index) => (
              <div className={'md:col-span-6 lg:col-span-4'} key={index}>
                <BuyCard data={item} index={index} handleClickBuy={handleClickBuy} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyOneToOne

BuyOneToOne.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
