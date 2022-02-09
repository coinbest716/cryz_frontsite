import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import CarouselService from 'components/Service/CarouselService'
import ArrowButton from 'components/Service/ArrowButton'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import ServiceButton from 'components/Service/ServiceButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from '../nutrition.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Nutrition = props => {
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

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [personalButton, setPersonalButton] = useState(false)
  const [onlineButton, setOnlineButton] = useState(false)
  const [streamButton, setStreamButton] = useState(false)

  const [sliderData, setSliderData] = useState([])
  const [readMoreCurrentState, setReadMoreCurrentState] = useState('less')

  const handleClickBuyPersion = () => {
    router.push({
      pathname: '/female-health/matronas/programa_5P/servicios/personal',
      query: {
        discipline_id: 3,
        service_type: 'personal',
        type: 'service',
        image: sliderData.length > 0 ? sliderData[0].path : '',
      },
    })
  }
  const handleClickBuyPlan = () => {
    router.push({
      pathname: '/female-health/matronas/programa_5P/servicios/online',
      query: {
        discipline_id: 3,
        service_type: 'online',
        type: 'service',
        image: sliderData.length > 0 ? sliderData[0].path : '',
      },
    })
  }
  const handleClickBuyStreaming = () => {
    router.push({
      pathname: '/female-health/matronas/programa_5P/servicios/streaming',
      query: {
        discipline_id: 3,
        service_type: 'streaming',
        type: 'service',
        image: sliderData.length > 0 ? sliderData[0].path : '',
      },
    })
  }

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={viewport === 'mobile' ? styles.m_container : styles.container}>
      <div className={'flex flex-wrap justify-center pb-20'}>
        <div className={globalStyles.container}>
          <div className={'mt-9'}>
            <BackButton viewport={viewport} />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
              <div className={viewport === 'mobile' ? styles.m_topTitle : styles.topTitle}>
                Programa 5P: Cerrando el círculo
              </div>
              <div className={viewport === 'mobile' ? styles.m_topDash : styles.topDash} />
              <div className={styles.topDescription + (viewport === 'mobile' ? ' mt-5' : ' mt-10 pb-20')}>
                <div
                  className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
                >
                  <div className={globalStyles.tinyMCEClass}>
                    <div className={'tinymce-class'}>
                      <p>Hemos creado este programa para tí.</p>
                      <p>
                        Nuestro <strong>“Programa 5P: cerrando el círculo”</strong> nace como forma de{' '}
                        <strong>acompañamiento personalizado</strong> durante el embarazo. Es un{' '}
                        <strong>programa flexible</strong> que se adapta a tus <strong>necesidades.</strong>
                      </p>
                      <p>
                        Consta de <strong>cuatro sesiones</strong> de 1h30’ de duración cada una, en ellas tratamos de
                        que conozcas herramientas y recursos; y descubras todos los que ya tienes. Todo el contenido
                        está basado en la <strong>fisiología y la salud,</strong> tú estás en el centro para poder
                        cerrar el círculo.{' '}
                      </p>
                      <p>
                        {' '}
                        <a href="/images/Programa_5P_cerrando_el_circulo.pdf" target="_blank">
                          {' '}
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          &gt;&gt; Descargar dossier
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {viewport === 'mobile' && (
              <div className={'col-span-12'}>
                <div className={'w-2/3 py-2'}>
                  <ServiceButton label={'Compra Presenciales'} onClick={handleClickBuyPersion} />
                </div>
                <div className={'w-2/3 py-2'}>
                  <ServiceButton label={'Compra 1 to 1 en streaming'} onClick={handleClickBuyStreaming} />
                </div>
              </div>
            )}
            <div
              className={
                'col-span-12 md:col-span-7 sm:col-span-12 relative flex' +
                (viewport === 'mobile' ? ' justify-center' : ' justify-end')
              }
            >
              {viewport !== 'mobile' && (
                <div className={'absolute top-10 z-10'}>
                  <CircularMark viewport={viewport} />
                </div>
              )}
              <div className={viewport === 'mobile' ? styles.m_carouselSection : styles.carouselSection}>
                <img src={'/images/Matrona_5p_1.png'} alt="" style={{ width: '100%', height: 'auto', opacity: 1 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewport !== 'mobile' && (
        <div className={'flex justify-start'}>
          <div className={'w-1/3'}>
            <ArrowButton
              label={'Compra presencial'}
              onClick={handleClickBuyPersion}
              type={'nutrition'}
              viewport={viewport}
            />
          </div>
          <div className={'w-1/3'}>
            <ArrowButton
              label={'Compra 1 to 1 en streaming'}
              onClick={handleClickBuyStreaming}
              type={'nutrition'}
              viewport={viewport}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
