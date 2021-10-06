import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import CircularMark from 'components/components/CircularMark'
import styles from './services.module.scss'
import Image from 'next/image'
import nextButtonPinkIcon from 'public/images/arrow-right-pink.svg'
import ArrowRightUpGrayIcon from 'public/images/arrow-right-up.svg'

const Services = () => {
  const trainingImage = '/images/card2.svg'
  const physiotherapyImage = '/images/card3.svg'
  const nutritionImage = '/images/card1.svg'
  const placeholder1 = '/images/placeholder1.svg'
  const placeholder2 = '/images/placeholder2.svg'
  const serviceTitle = ['Entrenamiento', 'Fisioterapia', 'Nutrición']

  const [serviceType, setServiceType] = useState({ type1: true, type2: false, type3: false })
  const handleMouseOver = type => {
    switch (type) {
      case 'type1':
        setServiceType({ type1: true, type2: false, type3: false })
        break
      case 'type2':
        setServiceType({ type1: false, type2: true, type3: false })
        break
      case 'type3':
        setServiceType({ type1: false, type2: false, type3: true })
        break
    }
  }

  const MainService = ({ title, objKey, objValue }) => {
    return (
      <div
        className={objValue ? 'w-2/3 relative' : 'w-1/3 relative'}
        onMouseOver={() => handleMouseOver(objKey)}
        // onMouseOut={() => handleMouseOut(objKey)}
      >
        {objKey === 'type1' && (
          <img src={objValue ? trainingImage : placeholder2} alt="" className={styles.serverImage} />
        )}
        {objKey === 'type2' && (
          <img src={objValue ? physiotherapyImage : placeholder1} alt="" className={styles.serverImage} />
        )}
        {objKey === 'type3' && (
          <img src={objValue ? nutritionImage : placeholder2} alt="" className={styles.serverImage} />
        )}
        <div className={styles.serverText}>{title}</div>
        {objValue ? (
          <div className={styles.serverArrow}>
            <Image src={nextButtonPinkIcon} alt="" width={30} height={23} />
          </div>
        ) : (
          <div className={styles.serverArrow}>
            <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className={globlaStyle.container}>
        <div className={styles.container}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 sm:col-span-12 ">
              <div className={styles.topTitle}>Servicios</div>
              <div className={styles.topDash} />
              <div className={styles.topDescription}>
                En Crys & CO ofrecemos un servicio personalizado y de calidad, especializado en planes 360 y a medida.
                <br />
                <br />
                Podrás beneficiarte de nuestros servicios de: entrenamiento, fisioterapia y nutrición, con infinidad de
                programas creados y supervisados por los mejores profesionales del sector.
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 sm:col-span-12 ">
              <div className={styles.circularMark}>
                <CircularMark />
              </div>
            </div>
          </div>
          <div className={'w-full flex justify-center mt-5'}>
            {Object.keys(serviceType).map((item, index) => (
              <MainService key={index} title={serviceTitle[index]} objKey={item} objValue={serviceType[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Services

Services.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
