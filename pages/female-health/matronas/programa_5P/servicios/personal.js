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
import * as gtag from '../../../../../utils/gtag'

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
  const sessionData = [
    {
      id: 106,
      service_type: 'personal',
      web_name: '1 Sesión fisioterapia ',
      description: 'En el centro ',
      price: '55',
    },
    {
      id: 108,
      service_type: 'personal',
      web_name: '2 Sesiones de lactancia ',
      description: 'Sesión 1,30 h antes del parto + 1 hora después del parto en el centro',
      price: '99',
    },
    {
      id: 107,
      service_type: 'personal',
      web_name: '1 Sesión con matrona',
      description: 'En el centro ',
      price: '110',
    },
    {
      id: 105,
      service_type: 'personal',
      web_name: 'Programa completo 5P',
      description: 'En el centro. 4 sesiones con matrona y 1 sesión con la fisioterapeuta ',
      price: '450',
    },
    {
      id: 110,
      service_type: 'personal',
      web_name: '1 sesión fisioterapia ',
      description: 'A domicilio ',
      price: '75',
    },
    {
      id: 111,
      service_type: 'personal',
      web_name: '1 sesión con matrona ',
      description: 'A domicilio ',
      price: '150',
    },
    {
      id: 112,
      service_type: 'personal',
      web_name: '2 sesiones de lactancia ',
      description: 'A domicilio. Sesión 1,30 h antes del parto + sesión 1 hora después del parto ',
      price: '120',
    },
    {
      id: 109,
      service_type: 'personal',
      web_name: 'Programa completo 5P',
      description: 'A domicilio. 4 sesiones con matrona y 1 sesión con la fisioterapeuta ',
      price: '555',
    },
  ]

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
          <BackButton viewport={viewport} />
        </div>
        {viewport === 'mobile' ? (
          <div>
            <div className={styles.m_title}>Bonos y Sesiones</div>
            <div className={styles.m_divider} />
            <div className={globalStyles.tinyMCEClass}>
              <div className={'tinymce-class'}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Si estás dudando cuáles de estos planes de "Programa 5P: Cerrando el círculo" se ajustan más a tus
                necesidades, ponte en contacto con nuestro equipo de especialistas para que te asesoren.
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
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Si estás dudando cuáles de estos planes de "Programa 5P: Cerrando el círculo" se ajustan más a tus
                  necesidades, ponte en contacto con nuestro equipo de especialistas para que te asesoren.
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
