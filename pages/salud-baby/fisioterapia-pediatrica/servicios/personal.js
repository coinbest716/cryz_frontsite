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
  const sessionData = [
    {
      id: 124,
      service_type: 'personal',
      web_name: 'Sesión valoración con porteo 30 min',
      description: 'En el centro',
      price: '40',
    },
    {
      id: 125,
      service_type: 'personal',
      web_name: 'Sesión cólico del lactante ',
      description: 'En el centro. Recomendado, 5 sesiones ',
      price: '55',
    },
    {
      id: 123,
      service_type: 'personal',
      web_name: 'Sesión valoración sin porteo',
      description: 'En el centro',
      price: '65',
    },
    {
      id: 126,
      service_type: 'personal',
      web_name: 'Pack valoración + porteo',
      description: 'En el centro.',
      price: '80',
    },
    {
      id: 128,
      service_type: 'personal',
      web_name: 'Sesión cólico del lactante ',
      description: 'A domicilio.',
      price: '65',
    },
    {
      id: 127,
      service_type: 'personal',
      web_name: 'Sesión valoración sin porteo ',
      description: 'A domicilio.',
      price: '85',
    },
    {
      id: 129,
      service_type: 'personal',
      web_name: 'Pack valoración + porteo',
      description: 'A domicilio.',
      price: '100',
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
          <BackButton />
        </div>
        {viewport === 'mobile' ? (
          <div>
            <div className={styles.m_title}>Bonos y Sesiones</div>
            <div className={styles.m_divider} />
            <div className={globalStyles.tinyMCEClass}>
              <div className={'tinymce-class'}>
                <p>
                Si estás dudando cuáles de estos planes de fisioterapia pediátrica se ajustan más a tus necesidades, ponte en contacto con nuestro equipo de especialistas para que te asesoren. 
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
                Si estás dudando cuáles de estos planes de fisioterapia pediátrica se ajustan más a tus necesidades, ponte en contacto con nuestro equipo de especialistas para que te asesoren. 
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
