import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './training.module.scss'
import { useRouter } from 'next/router'
import BackButton from 'components/components/BackButton'

const Training = () => {
  const router = useRouter()
  const forwardGrayIcon = '/images/arrow-right-gray.svg'

  const image01 = '/images/card1.jpg'
  const image02 = '/images/card2.jpg'
  const image03 = '/images/card4.jpg'
  const [activeImage, setActiveImage] = useState('')
  const [activeHover, setActiveHover] = useState(false)

  const handleMouseMover = event => {
    if (activeImage === '') return
    let x = event.clientX - 200
    let y = event.clientY - 280
    let shark = document.getElementById('shark')
    shark.style.left = x + 'px'
    shark.style.top = y + 'px'
  }

  const [serverType, setServerType] = useState({ type1: false, type2: false, type3: false })
  const handleMouseOver = type => {
    setActiveHover(true)
    switch (type) {
      case 'type1':
        // setServerType({ type1: true, type2: false, type3: false })
        setActiveImage(image01)
        break
      case 'type2':
        // setServerType({ type1: false, type2: true, type3: false })
        setActiveImage(image02)
        break
      case 'type3':
        // setServerType({ type1: false, type2: false, type3: true })
        setActiveImage(image03)
        break
    }
  }
  const handleMouseLeave = type => {
    // setServerType({ type1: false, type2: false, type3: false })
    setActiveHover(false)
    // setActiveImage('')
  }

  const handleClick = type => {
    switch (type) {
      case 'type1':
        router.push('/buy-one-to-one')
        break
      case 'type2':
        router.push('/buy-person')
        break
      case 'type3':
        router.push('/buy-one-to-one')
        break
    }
  }

  return (
    <div className={'z-10 ' + styles.container} onMouseMove={handleMouseMover}>
      <div className={'z-0 ' + styles.circleImageCover} id="shark">
        <img src={activeImage} alt="" className={activeHover ? styles.animationImage : styles.circleImage} />
      </div>
      <div className="flex flex-wrap justify-center pb-20">
        <div className={globlaStyle.container}>
          <div className="mt-9">
            <BackButton />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 sm:col-span-12 ">
              <div className={'pt-10 pb-2 ' + styles.topTitle}>Entrenamiento</div>
              <div className={styles.topDash} />
              <div className={styles.topDescription + ' mt-10 pb-20'}>
                Entrenamiento 1 to 1 en streaming: Entrenamientos personalizados de una hora con tu entrenador, desde
                nuestra plataforma. <br />
                <br />
                Entrenamiento presencial de una hora en el centro de Crys Dyaz o en el domicilio del paciente. <br />
                <br />
                Planes online personalizados, basado en videos de ejercicios, al cual el paciente accederá por medio de
                la plataforma online <br />
                <br />
              </div>
            </div>
            <div className="col-span-12 md:col-span-1 sm:col-span-12 " />
            <div className="col-span-12 md:col-span-7 sm:col-span-12 relative">
              <div className="flex h-full">
                <div className={'w-1/3 px-12 '}>
                  <div
                    className={'h-full relative ' + styles.activeSection}
                    onMouseOver={() => handleMouseOver('type1')}
                    onMouseLeave={() => handleMouseLeave('type1')}
                  >
                    <div className={'w-1/3 absolute ' + styles.verticalText} onClick={() => handleClick('type1')}>
                      <span className={styles.number}>01&nbsp;&nbsp;</span>
                      <span className={styles.typograph}>Presencial&nbsp;</span>
                      <img
                        src={forwardGrayIcon}
                        alt=""
                        className={styles.arrowIcon}
                        style={{ width: '35px', height: '28px', minWidth: '35px' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/3 px-12">
                  <div
                    className={'h-full relative ' + styles.activeSection}
                    onMouseOver={() => handleMouseOver('type2')}
                    onMouseLeave={() => handleMouseLeave('type2')}
                  >
                    <div className={'w-1/3 absolute ' + styles.verticalText} onClick={() => handleClick('type2')}>
                      <span className={styles.number}>02&nbsp;&nbsp;</span>
                      <span className={styles.typograph}>Planes online&nbsp;</span>
                      <img
                        src={forwardGrayIcon}
                        alt=""
                        className={styles.arrowIcon}
                        style={{ width: '35px', height: '28px', minWidth: '35px' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/3 px-12">
                  <div
                    className={'h-full relative ' + styles.activeSection}
                    onMouseOver={() => handleMouseOver('type3')}
                    onMouseLeave={() => handleMouseLeave('type3')}
                  >
                    <div className={'w-1/3 absolute ' + styles.verticalText} onClick={() => handleClick('type3')}>
                      <span className={styles.number}>03&nbsp;&nbsp;</span>
                      <span className={styles.typograph}>1 to 1 en streaming&nbsp;</span>
                      <img
                        src={forwardGrayIcon}
                        alt=""
                        className={styles.arrowIcon}
                        style={{ width: '35px', height: '28px', minWidth: '35px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Training

Training.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
