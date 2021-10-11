import React, { useState, useEffect } from 'react'
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './training.module.scss'
import backGrayIcon from 'public/images/arrow-left-gray.svg'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Training = () => {
  const router = useRouter()
  const forwardGrayIcon = '/images/arrow-right-gray.svg'

  const image01 = '/images/card1.svg'
  const image02 = '/images/card2.svg'
  const image03 = '/images/card4.svg'
  const [activeImage, setActiveImage] = useState('')

  const handleMouseMover = event => {
    if (activeImage === '') return
    let x = event.clientX - 250
    let y = event.clientY - 330
    let shark = document.getElementById('shark')
    shark.style.left = x + 'px'
    shark.style.top = y + 'px'
  }

  const [serverType, setServerType] = useState({ type1: false, type2: false, type3: false })
  const handleMouseOver = type => {
    switch (type) {
      case 'type1':
        setServerType({ type1: true, type2: false, type3: false })
        setActiveImage(image01)
        break
      case 'type2':
        setServerType({ type1: false, type2: true, type3: false })
        setActiveImage(image02)
        break
      case 'type3':
        setServerType({ type1: false, type2: false, type3: true })
        setActiveImage(image03)
        break
    }
  }

  const handleClick = type => {
    switch (type) {
      case 'type1':
        router.push('/services')
        break
      case 'type2':
        router.push('/services')
        break
      case 'type3':
        router.push('/services')
        break
    }
  }

  const handleClickBack = () => {
    router.push('/services')
  }

  return (
    <div className={styles.container} onMouseMove={handleMouseMover}>
      {(serverType.type1 || serverType.type2 || serverType.type3) && (
        <div className={styles.circleImageCover} id="shark">
          <img src={activeImage} alt="" className={styles.circleImage} />
        </div>
      )}
      <div className="flex flex-wrap justify-center pb-20">
        <div className={globlaStyle.container}>
          <div className="mt-9">
            <button className="flex justify-between items-center hover:bg-gray-200 p-0.5 rounded-sm" onClick={handleClickBack}>
              <Image src={backGrayIcon} alt="" width={20} height={15} />
              <p className={styles.back}>&nbsp;&nbsp;Volver</p>
            </button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4 sm:col-span-12 ">
              <div className={'pt-10 ' + styles.topTitle}>Entrenamiento</div>
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
            <div className="col-span-12 md:col-span-8 sm:col-span-12 relative">
              <div className={styles.verticalBottom}>
                <div className={styles.sortStart}>
                  <div
                    className={'w-1/3 ' + styles.verticalText}
                    onMouseOver={() => handleMouseOver('type1')}
                    onClick={() => handleClick('type1')}
                  >
                    <span className={styles.number}>01&nbsp;&nbsp;</span>
                    <span className={styles.typograph}>Presencial&nbsp;</span>
                    <img src={forwardGrayIcon} alt="" className={styles.arrowIcon} />
                  </div>
                  <div
                    className={'w-1/3 ' + styles.verticalText}
                    onMouseOver={() => handleMouseOver('type2')}
                    onClick={() => handleClick('type2')}
                  >
                    <span className={styles.number}>02&nbsp;&nbsp;</span>
                    <span className={styles.typograph}>Planes online&nbsp;</span>
                    <img src={forwardGrayIcon} alt="" className={styles.arrowIcon} />
                  </div>
                  <div
                    className={'w-1/3 ' + styles.verticalText}
                    onMouseOver={() => handleMouseOver('type3')}
                    onClick={() => handleClick('type3')}
                  >
                    <span className={styles.number}>03&nbsp;&nbsp;</span>
                    <span className={styles.typograph}>1 to 1 en streaming&nbsp;</span>
                    <img src={forwardGrayIcon} alt="" className={styles.arrowIcon} />
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
