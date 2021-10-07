import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './physiotherapy.module.scss'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import CircularMark from 'components/components/CircularMark'
import TeamSectionData from 'assets/data/TeamSectionData'
import CarouselService from 'components/components/CarouselService'

const Physiotherapy = () => {
  const router = useRouter()
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    setSliderData(TeamSectionData)
  }, [])

  const handleClickBack = () => {
    router.push('/services')
  }
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

  return (
    <div className={styles.container}>
      <div className="flex flex-wrap justify-center pb-20">
        <div className={globlaStyle.container}>
          <div className="mt-9">
            <button className="flex justify-between items-center" onClick={handleClickBack}>
              <Image src={backGrayIcon} alt="" width={20} height={15} />
              <p className={styles.back}>&nbsp;&nbsp;Volver</p>
            </button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5 sm:col-span-12 ">
              <div className={'pt-10 ' + styles.topTitle}>Fisioterapia</div>
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
            <div className="col-span-12 md:col-span-7 sm:col-span-12 ">
              <div className={styles.circularMark}>
                <CircularMark />
              </div>
              <div className={styles.middleSection}>
                <CarouselService sliderData={sliderData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Physiotherapy

Physiotherapy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
