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
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './services.module.scss'

// images and icons
import nextButtonPinkIcon from 'public/images/arrow-right-pink.svg'
import ArrowRightUpGrayIcon from 'public/images/arrow-right-up.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import { NextSeo } from 'next-seo'

const Services = props => {
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
  const { viewport } = props
  const router = useRouter()
  const [mainService, setMainService] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [getCmsServiceDisciplineList, { data: cmsServiceData, loading: cmsServiceLoading, error: cmsServiceError }] =
    useLazyQuery(graphql.queries.getCmsServiceDisciplineList)
  const [getCmsService, { data: mainData, loading: mainLoading, error: mainError }] = useLazyQuery(
    graphql.queries.getCmsService
  )
  const [contactType, setContactType] = useState({ type1: true, type2: false, type3: false })

  const placeholder1 = '/images/placeholder1.png'
  const placeholder2 = '/images/placeholder2.png'
  const placeholder3 = '/images/placeholder3.png'

  // handlers
  useEffect(() => {
    getCmsServiceDisciplineList()
    getCmsService()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch({ type: 'set', isLoading: cmsServiceLoading })
    if (!cmsServiceError && cmsServiceData && cmsServiceData.getCmsServiceDisciplineList) {
      setMainService(cmsServiceData.getCmsServiceDisciplineList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmsServiceLoading, cmsServiceData, cmsServiceError])

  useEffect(() => {
    if (!mainError && mainData && mainData.getCmsService) {
      setTitle(mainData.getCmsService?.title_one)
      setDescription(mainData.getCmsService?.text)
    }
  }, [mainLoading, mainData, mainError])

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
      case 1:
        router.push('/services/training')
        break
      case 2:
        router.push('/services/physiotherapy')
        break
      case 3:
        router.push('/services/nutrition')
        break
    }
  }

  return (
    <>
      <NextSeo
        title="CrysDyaz&Co Servicios"
        description="Fisioterapia, entrenamiento personal y mucho más"
        openGraph={{
          type: 'website',
          locale: 'es_ES',
          url: 'https://crysdyazandco.com/services',
          site_name: 'CrysDyaz&Co',
        }}
      />

      <div className={'flex flex-wrap justify-center ' + styles.serviceContainer}>
        <div className={globalStyles.container}>
          <div className={viewport === 'mobile' ? styles.m_container : styles.container}>
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-12 md:col-span-6 sm:col-span-12 '}>
                <div className={viewport === 'mobile' ? styles.m_topTitle : styles.topTitle}>{title}</div>
                <div className={viewport === 'mobile' ? styles.m_topDash : styles.topDash} />
                <div className={globalStyles.tinyMCEClass}>
                  <div
                    className={
                      styles.topDescription + ' tinymce-class' + (viewport === 'mobile' ? ' mt-4 mb-1' : ' mt-11 mb-5')
                    }
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                </div>
              </div>
              {viewport !== 'mobile' ? (
                <div className={'col-span-12 md:col-span-6 sm:col-span-12 '}>
                  <div className={'z-10 ' + styles.circularMark}>
                    <CircularMark viewport={viewport} />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {viewport === 'mobile' ? (
              <div className={'w-full mt-5 overflow-hidden'}>
                <div className="flex">
                  <div
                    className={'relative cursor-pointer w-1/2 '}
                    onMouseOver={() => handleMouseOver('type1')}
                    onClick={() => handleClick(mainService[0].id)}
                  >
                    <img
                      src={mainService[0]?.image || placeholder1}
                      alt=""
                      style={{ width: '100%', height: '150px', opacity: 0.4 }}
                    />
                    <div className={styles.m_serverText}>{mainService[0]?.name}</div>
                    <div className={styles.m_serverArrow}>
                      <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                    </div>
                  </div>

                  <div
                    className={'relative cursor-pointer w-1/2 '}
                    onMouseOver={() => handleMouseOver('type2')}
                    onClick={() => handleClick(mainService[1].id)}
                  >
                    <img
                      src={mainService[1]?.image || placeholder2}
                      alt=""
                      style={{ width: '100%', height: '150px', opacity: 0.4 }}
                    />
                    <div className={styles.m_serverText}>{mainService[1]?.name}</div>
                    <div className={styles.m_serverArrow}>
                      <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={'relative cursor-pointer w-1/2 '}
                    onMouseOver={() => handleMouseOver('type3')}
                    onClick={() => handleClick(mainService[2].id)}
                  >
                    <img
                      src={mainService[2]?.image || placeholder3}
                      alt=""
                      style={{ width: '100%', height: '150px', opacity: 0.4 }}
                    />
                    <div className={styles.m_serverText}>{mainService[2]?.name}</div>
                    <div className={styles.m_serverArrow}>
                      <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={'flex w-full mt-5 overflow-hidden'}>
                <div
                  className={
                    'relative cursor-pointer ' + (contactType.type1 ? styles.boxToRightActive : styles.boxDeactive)
                  }
                  onMouseOver={() => handleMouseOver('type1')}
                  onClick={() => handleClick(mainService[0].id)}
                >
                  <img
                    src={contactType.type1 ? mainService[0]?.image : placeholder1}
                    alt=""
                    style={{ width: '100%', height: '288px', opacity: 0.4 }}
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
                  className={
                    'relative cursor-pointer ' + (contactType.type2 ? styles.boxToLeftActive : styles.boxDeactive)
                  }
                  onMouseOver={() => handleMouseOver('type2')}
                  onClick={() => handleClick(mainService[1].id)}
                >
                  <img
                    src={contactType.type2 ? mainService[1]?.image : placeholder2}
                    alt=""
                    style={{ width: '100%', height: '288px', opacity: 0.4 }}
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
                  className={
                    'relative cursor-pointer ' + (contactType.type3 ? styles.boxToLeftActive : styles.boxDeactive)
                  }
                  onMouseOver={() => handleMouseOver('type3')}
                  onClick={() => handleClick(mainService[2].id)}
                >
                  <img
                    src={contactType.type3 ? mainService[2]?.image : placeholder3}
                    alt=""
                    style={{ width: '100%', height: '288px', opacity: 0.4 }}
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Services

Services.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
