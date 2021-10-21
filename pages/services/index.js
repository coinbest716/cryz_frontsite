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

  // const trainingImage = '/images/pcard1.jpg'
  // const physiotherapyImage = '/images/pcard2.jpg'
  // const nutritionImage = '/images/pcard3.jpg'
  const trainingImage = '/images/card1.png'
  const physiotherapyImage = '/images/card2.png'
  const nutritionImage = '/images/card3.png'
  const placeholder1 = '/images/placeholder1.png'
  const placeholder2 = '/images/placeholder2.png'
  const placeholder3 = '/images/placeholder3.png'

  const [contactType, setContactType] = useState({ type1: true, type2: false, type3: false })
  const handleMouseOver = type => {
    switch (type) {
      case 'type1':
        setContactType({ type1: true, type2: false, type3: false })
        break
      case 'type2':
        setContactType({ type1: false, type2: true, type3: false })
        break
      case 'type3':
        setContactType({ type1: false, type2: false, type3: true })
        break
    }
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
              <div className={styles.topTitle}>Fem Health</div>
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
              <div className={'z-10 ' + styles.circularMark}>
                <CircularMark />
              </div>
            </div>
          </div>
          <div className={'flex w-full mt-5 overflow-hidden'}>
            <div
              className={'relative ' + (contactType.type1 ? styles.boxToRightActive : styles.boxDeactive)}
              onMouseOver={() => handleMouseOver('type1')}
              onClick={() => handleClick('type1')}
            >
              <img
                src={contactType.type1 ? trainingImage : placeholder1}
                style={{ width: '100%', height: '288px', opacity: 0.3 }}
                className={styles.box1}
              />

              <div className={styles.serverText}>Entrenamiento</div>
              {contactType.type1 ? (
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
              className={'relative ' + (contactType.type2 ? styles.boxToLeftActive : styles.boxDeactive)}
              onMouseOver={() => handleMouseOver('type2')}
              onClick={() => handleClick('type2')}
            >
              <img
                src={contactType.type2 ? physiotherapyImage : placeholder2}
                style={{ width: '100%', height: '288px', opacity: 0.3 }}
                className={styles.box1}
              />
              <div className={styles.serverText}>Fisioterapia</div>
              {contactType.type2 ? (
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
              className={'relative ' + (contactType.type3 ? styles.boxToLeftActive : styles.boxDeactive)}
              onMouseOver={() => handleMouseOver('type3')}
              onClick={() => handleClick('type3')}
            >
              <img
                src={contactType.type3 ? nutritionImage : placeholder3}
                style={{ width: '100%', height: '288px', opacity: 0.3 }}
                className={styles.box1}
              />
              <div className={styles.serverText}>Nutrición</div>
              {contactType.type3 ? (
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
  )
}
export default Services

Services.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
