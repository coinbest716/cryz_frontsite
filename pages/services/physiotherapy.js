import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// third party components
import ReactReadMoreReadLess from 'react-read-more-read-less'
import ServerPhysiotherapy from 'assets/data/ServerPhysiotherapy'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'
import CarouselService from 'components/components/service/CarouselService'
import ArrowButton from 'components/components/service/ArrowButton'
import BackButton from 'components/components/BackButton'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './physiotherapy.module.scss'

const Physiotherapy = () => {
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
  const router = useRouter()
  const [sliderData, setSliderData] = useState([])
  const description = `Nuestro equipo de fisioterapia y osteopatía integra el tratamiento de diferentes patologías, así como,
  dolores y molestias de nuestro día a día para distintos tipos de perfiles: embarazadas, ancianos, bebés,
  deportistas… En constante formación de las últimas tendencias y metodologías, realizamos una valoración
  previa del paciente y utilizamos técnicas manuales, además de aparatología como INDIBA, ya sea lesiones
  como postparto, kinesiotaping, punción seca...
  Algunos de nuestros tratamientos son la terapia manual, terapia activa, osteopatía, INDIBA, crioterapia,
  termoterapia, electroterapia (TENS)...
  Todo ello para mejorar tu bienestar y llevar un estilo de vida con la mayor calidad posible– INDIBA:
  Método que utiliza el sistema de transferencia eléctrica capacitiva resistiva al aplicar corrientes
  eléctricas para el tratamiento de lesiones musculo esqueléticas. También tratamos los hipopresivos con
  esta técnica. – OTROS SERVICIOS: Vendajes funcionales y neuromusculares, punción seca, crioterapia,
  termoterapia, electroterapia (TENS).`

  // handlers
  useEffect(() => {
    setSliderData(ServerPhysiotherapy)
  }, [])

  const handleClickBuy = () => {
    router.push('/buy/buy-person')
  }

  return (
    <div className={styles.container}>
      <div className={'flex flex-wrap justify-center pb-20'}>
        <div className={globlaStyle.container}>
          <div className={'mt-9'}>
            <BackButton />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
              <div className={'pt-10 pb-2 ' + styles.topTitle}>Fisioterapia</div>
              <div className={styles.topDash} />
              <div className={styles.topDescription + ' mt-10 pb-20'}>
                <ReactReadMoreReadLess
                  charLimit={500}
                  readMoreText={' [leer mas…] '}
                  readLessText={' [Leer menos…]'}
                  readMoreClassName={'read-more-less--more'}
                  readLessClassName={'read-more-less--less'}
                >
                  {description}
                </ReactReadMoreReadLess>
              </div>
            </div>
            <div className={'col-span-12 md:col-span-7 sm:col-span-12 relative flex justify-end'}>
              <div className={'absolute top-10 z-10'}>
                <CircularMark />
              </div>
              <div className={styles.carouselSection}>
                <CarouselService sliderData={sliderData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'w-1/3 mr-1'}>
        <ArrowButton label={'Compra  presenciales'} onClick={handleClickBuy} type={'physiotherapy'} />
      </div>
    </div>
  )
}
export default Physiotherapy

Physiotherapy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
