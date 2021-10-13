import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './course.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import ArrowButton from 'components/components/Academy/ArrowButton'
import Feature from 'components/components/Academy/Feature'
import DownloadPDF from 'components/components/Academy/DownloadPDF'
import CarouselAcademy from 'components/components/Academy/CarouselAcademy'
import ServerPhysiotherapy from 'assets/data/ServerPhysiotherapy'

const Course = () => {
  const router = useRouter()
  const [feature, setFeature] = useState([])
  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    setSliderData(ServerPhysiotherapy)
  }, [])

  useEffect(() => {
    setFeature([
      { id: 0, path: '/images/category.svg', bgColor: '#D2DADA', topLabel: 'Categoria', lowLabel: 'Presencial' },
      { id: 1, path: '/images/type.svg', bgColor: '#DFDBD5', topLabel: 'Tipo', lowLabel: 'Profesional' },
      { id: 1, path: '/images/time.svg', bgColor: '#E3BBAA', topLabel: 'Tiempo', lowLabel: '15h.' },
    ])
  }, [])

  const handleClickBack = () => {
    router.push('/services')
  }

  const handleClickPayment = () => {
    console.log('handleClickPayment')
  }
  const handleClickDownlodPDF = () => {
    console.log('handleClickDownlodPDF')
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-wrap justify-center pb-20">
        <div className={globlaStyle.container}>
          <div className="mt-9">
            <button
              className="flex justify-between items-center hover:bg-gray-200 p-0.5 rounded-sm"
              onClick={handleClickBack}
            >
              <Image src={backGrayIcon} alt="" width={20} height={15} />
              <p className={styles.back}>&nbsp;&nbsp;Volver</p>
            </button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5 sm:col-span-12 ">
              <div className={'pt-10 ' + styles.topTitle}>
                Formación de suelo pélvico, entrenamiento durante el embarazo y postparto. 2º EDICIÓN
              </div>
              <div className={styles.duration + ' pt-7'}>Duración: febrero a septiembre 2022</div>
              <div className="mt-6 " style={{ width: '326px' }}>
                <ArrowButton label={'1.250€'} onClick={handleClickPayment} />
              </div>
              <div className={styles.topDescription + ' mt-8'}>
                Especialización dirigida a profesionales que quieran trabajar o que trabajen con embarazadas, post parto
                y hombres o mujeres con disfunción de suelo pélvico. <br />
                <br />A lo largo de cinco seminarios, profundizaremos en el conocimiento práctico y teórico del
                entrenamiento del suelo pélvico masculino y femenino, dedicando dos de ellos, en exclusiva, al estudio
                del entrenamiento personal de la mujer durante el embarazo y tras el parto.{' '}
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 sm:col-span-12 relative flex justify-end">
              <div className="flex justify-start pt-10">
                {feature.map((item, index) => (
                  <div className="mr-10" key={index}>
                    <Feature data={item} />
                  </div>
                ))}
                <div>
                  <DownloadPDF onClick={handleClickDownlodPDF} />
                </div>
              </div>
              <div className="flex justify-end pt-10 relative">
                <div style={{ width: '500px' }}>
                  <CarouselAcademy sliderData={sliderData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Course

Course.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
