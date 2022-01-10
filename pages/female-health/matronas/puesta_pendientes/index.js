import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import CarouselService from 'components/components/service/CarouselService'
import ArrowButton from 'components/components/service/ArrowButton'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import ServiceButton from 'components/components/service/ServiceButton'

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
      pathname: '/salud-baby/fisioterapia-pediatrica/servicios/personal',
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
      pathname: '/salud-baby/fisioterapia-pediatrica/servicios/online',
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
      pathname: '/salud-baby/fisioterapia-pediatrica/servicios/streaming',
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
            <BackButton />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
              <div className={viewport === 'mobile' ? styles.m_topTitle : styles.topTitle}>Puesta de pendientes</div>
              <div className={viewport === 'mobile' ? styles.m_topDash : styles.topDash} />
              <div className={styles.topDescription + (viewport === 'mobile' ? ' mt-5' : ' mt-10 pb-20')}>
                <div
                  className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
                >
                  <div className={globalStyles.tinyMCEClass}>
                    <div className={'tinymce-class'}>
                      <p>Las familias que deciden poner pendientes a sus bebés buscan un lugar seguro y respetuoso.</p>
						
                      <p>La teoría de que a los bebés no les duele la puesta de pendientes no es cierta, pero podemos intentar minimizar al máximo esa sensación usando pomada anestésica y poniendo al bebé en brazos o al pecho.</p>
                      <p>Puedes elegir entre varios modelos disponibles. Para la puesta utilizamos nuestros propios pendientes, que son pendientes hipoalergénicos, de acero quirúrgico, especiales para esta primera puesta y del tamaño adecuado a la oreja de la bebé.</p>
                        
                      <p>En el servicio están incluidos los pendientes, el uso de pomada anestésica, un antiséptico para el cuidado posterior y una visita de revisión en el centro, en ambos casos, a las 6 semanas y, si quieren, el cambio de pendientes.</p>
                        
                      <p>No hay recomendaciones oficiales que indiquen un momento concreto para realizar la técnica, pero aconsejamos que el bebé ya haya sido valorado por su pediatra en la primera revisión rutinaria. </p>
            
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
                <CarouselService sliderData={sliderData} viewport={viewport} />
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
        </div>
      )}
    </div>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
