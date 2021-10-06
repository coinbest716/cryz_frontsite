import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import CircularMark from 'components/components/CircularMark'
import styles from './services.module.scss'
import Image from 'next/image'
import nextButtonPinkIcon from 'public/images/arrow-right-pink.svg'
import ArrowRightUpGrayIcon from 'public/images/arrow-right-up.svg'
import { useRouter } from 'next/router'

const Services = () => {
  const router = useRouter()

  const trainingImage = '/images/card2.svg'
  const physiotherapyImage = '/images/card3.svg'
  const nutritionImage = '/images/card1.svg'
  const placeholder1 = '/images/placeholder1.svg'
  const placeholder2 = '/images/placeholder2.svg'
  const placeholder3 = '/images/placeholder3.svg'
  const [activeIimage, setActiveImage] = useState('')
  const [activePlaceholder, setActivePlaceholder] = useState('')

  const [serverType, setServerType] = useState({ type1: false, type2: false, type3: false })
  const handleMouseOver = type => {
    switch (type) {
      case 'type1':
        setServerType({ type1: true, type2: false, type3: false })
        setActiveImage(trainingImage)
        setActivePlaceholder(placeholder1)
        break
      case 'type2':
        setServerType({ type1: false, type2: true, type3: false })
        setActiveImage(physiotherapyImage)
        setActivePlaceholder(placeholder2)
        break
      case 'type3':
        setServerType({ type1: false, type2: false, type3: true })
        setActiveImage(nutritionImage)
        setActivePlaceholder(placeholder3)
        break
    }
  }
  const handleMouseOut = () => {
    setServerType({ type1: false, type2: false, type3: false })
  }
  const handleClick = type => {
    switch (type) {
      case 'type1':
        router.push('/services/training')
        break
      case 'type2':
        router.push('/services/physiotherapy')
        break
      case 'type3':
        router.push('/services/nutrition')
        break
    }
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
            <div className={styles.scontainer}>
              <div
                className={styles.box}
                onMouseOver={() => handleMouseOver('type1')}
                onMouseOut={handleMouseOut}
                onClick={() => handleClick('type1')}
              >
                <img src={serverType.type1 ? activeIimage : activePlaceholder} />
                <div className={styles.serverText}>Entrenamiento</div>
                {serverType.type1 ? (
                  <div className={styles.serverArrow}>
                    <Image src={nextButtonPinkIcon} alt="" width={30} height={23} />
                  </div>
                ) : (
                  <div className={styles.serverArrow}>
                    <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                  </div>
                )}
              </div>
              <div
                className={styles.box}
                onMouseOver={() => handleMouseOver('type2')}
                onMouseOut={handleMouseOut}
                onClick={() => handleClick('type2')}
              >
                <img src={serverType.type2 ? activeIimage : activePlaceholder} />
                <div className={styles.serverText}>Fisioterapia</div>
                {serverType.type2 ? (
                  <div className={styles.serverArrow}>
                    <Image src={nextButtonPinkIcon} alt="" width={30} height={23} />
                  </div>
                ) : (
                  <div className={styles.serverArrow}>
                    <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                  </div>
                )}
              </div>
              <div
                className={styles.box}
                onMouseOver={() => handleMouseOver('type3')}
                onMouseOut={handleMouseOut}
                onClick={() => handleClick('type3')}
              >
                <img src={serverType.type3 ? activeIimage : activePlaceholder} />
                <div className={styles.serverText}>Nutrición</div>
                {serverType.type3 ? (
                  <div className={styles.serverArrow}>
                    <Image src={nextButtonPinkIcon} alt="" width={30} height={23} />
                  </div>
                ) : (
                  <div className={styles.serverArrow}>
                    <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                  </div>
                )}
              </div>
            </div>
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
