import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import CircularMark from 'components/components/CircularMark'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './services.module.scss'

// images and icons
import nextButtonPinkIcon from 'public/images/arrow-right-pink.svg'
import ArrowRightUpGrayIcon from 'public/images/arrow-right-up.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Services = () => {
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

  const [getCmsServiceDisciplineList, { data: cmsServiceData, loading: cmsServiceLoading, error: cmsServiceError }] =
    useLazyQuery(graphql.queries.getCmsServiceDisciplineList)
  const [mainService, setMainService] = useState([])
  const placeholder1 = '/images/placeholder1.png'
  const placeholder2 = '/images/placeholder2.png'
  const placeholder3 = '/images/placeholder3.png'

  const [contactType, setContactType] = useState({ type1: true, type2: false, type3: false })

  // handlers
  useEffect(() => {
    getCmsServiceDisciplineList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!cmsServiceError && cmsServiceData && cmsServiceData.getCmsServiceDisciplineList) {
      console.log('personal information ', cmsServiceData.getCmsServiceDisciplineList)
      setMainService(cmsServiceData.getCmsServiceDisciplineList)
    }
  }, [cmsServiceLoading, cmsServiceData, cmsServiceError])

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
    <div className={'flex flex-wrap justify-center'}>
      <div className={globlaStyle.container}>
        <div className={styles.container}>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-6 sm:col-span-12 '}>
              <div className={styles.topTitle + ' pb-2'}>Servicios</div>
              <div className={styles.topDash} />
              <div className={styles.topDescription}>
                En Crys & CO ofrecemos un servicio personalizado y de calidad, especializado en planes 360 y a medida.
                <br />
                <br />
                Podrás beneficiarte de nuestros servicios de: entrenamiento, fisioterapia y nutrición, con infinidad de
                programas creados y supervisados por los mejores profesionales del sector.
              </div>
            </div>
            <div className={'col-span-12 md:col-span-6 sm:col-span-12 '}>
              <div className={'z-10 ' + styles.circularMark}>
                <CircularMark />
              </div>
            </div>
          </div>
          <div className={'flex w-full mt-5 overflow-hidden'}>
            <div
              className={
                'relative cursor-pointer ' + (contactType.type1 ? styles.boxToRightActive : styles.boxDeactive)
              }
              onMouseOver={() => handleMouseOver('type1')}
              onClick={() => handleClick('type1')}
            >
              <img
                src={contactType.type1 ? mainService[0]?.image : placeholder1}
                alt=""
                style={{ width: '100%', height: '288px', opacity: 0.4 }}
                className={styles.box1}
              />

              <div className={styles.serverText}>{mainService[0]?.name}</div>
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
              className={'relative cursor-pointer ' + (contactType.type2 ? styles.boxToLeftActive : styles.boxDeactive)}
              onMouseOver={() => handleMouseOver('type2')}
              onClick={() => handleClick('type2')}
            >
              <img
                src={contactType.type2 ? mainService[1]?.image : placeholder2}
                alt=""
                style={{ width: '100%', height: '288px', opacity: 0.4 }}
                className={styles.box1}
              />
              <div className={styles.serverText}>{mainService[1]?.name}</div>
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
              className={'relative cursor-pointer ' + (contactType.type3 ? styles.boxToLeftActive : styles.boxDeactive)}
              onMouseOver={() => handleMouseOver('type3')}
              onClick={() => handleClick('type3')}
            >
              <img
                src={contactType.type3 ? mainService[2]?.image : placeholder3}
                alt=""
                style={{ width: '100%', height: '288px', opacity: 0.4 }}
                className={styles.box1}
              />
              <div className={styles.serverText}>{mainService[2]?.name}</div>
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
