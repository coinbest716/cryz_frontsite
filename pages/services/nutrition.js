import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './nutrition.module.scss'
import { useRouter } from 'next/router'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import CircularMark from 'components/components/CircularMark'
import ServerPhysiotherapy from 'assets/data/ServerPhysiotherapy'
import CarouselService from 'components/components/service/CarouselService'
import ArrowButton from 'components/components/service/ArrowButton'
import BackButton from 'components/components/BackButton'

const Nutrition = () => {
  const router = useRouter()
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    setSliderData(ServerPhysiotherapy)
  }, [])

  const handleClickBuyStreaming = () => {
    router.push('/buy-one-to-one')
  }
  const handleClickBuyPersion = () => {
    router.push('/buy-person')
  }
  const handleClickBuyPlan = () => {
    router.push('/buy-plans-online')
  }

  const description = `Somos especialistas en educación de hábitos y promoción de la salud. Nuestros planes van dirigidos a personas que quieren cuidar su alimentación y mejorar su salud y/o su físico, ayudándoles a crear e introducir nuevas rutinas saludables en su día a día.
  Previa valoración inicial del paciente y realización de un estudio personalizado para poder escoger su plan más adecuado, nos adaptamos a patologías como obesidad, cáncer, diabetes, alergias e intolerancias, entre otras y realizamos programas específicos de alimentación sana antes y durante el embarazo, así como, en casos especiales. 
  Hacemos seguimiento y tenemos en cuenta los gustos de cada paciente, sus horarios, disponibilidad, etc. Les apoyamos en cada paso del camino, creando nuevos hábitos saludables y mejorando otros. “Cambia tus hábitos y tu vida cambiará”`

  return (
    <div className={styles.container}>
      <div className="flex flex-wrap justify-center pb-20">
        <div className={globlaStyle.container}>
          <div className="mt-9">
            <BackButton />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5 sm:col-span-12 ">
              <div className={'pt-10 ' + styles.topTitle}>Nutrición</div>
              <div className={styles.topDash} />
              <div className={styles.topDescription + ' mt-10 pb-20'}>
                <ReactReadMoreReadLess
                  charLimit={500}
                  readMoreText={' [leer mas…] '}
                  readLessText={' [Leer menos…]'}
                  readMoreClassName="read-more-less--more"
                  readLessClassName="read-more-less--less"
                >
                  {description}
                </ReactReadMoreReadLess>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 sm:col-span-12 relative flex justify-end">
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
      <div className="flex justify-center">
        <div className="w-1/3">
          <ArrowButton label={'Compra  1 to 1 en streaming'} onClick={handleClickBuyStreaming} type={'nutrition'} />
        </div>
        <div className="w-1/3">
          <ArrowButton label={'Compra presenciales'} onClick={handleClickBuyPersion} type={'nutrition'} />
        </div>
        <div className="w-1/3">
          <ArrowButton label={'Compra planes online'} onClick={handleClickBuyPlan} type={'nutrition'} />
        </div>
      </div>
    </div>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
