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

  const [contactType, setContactType] = useState({ type1: true, type2: false, type3: false })

  const placeholder1 = '/images/placeholder1.png'
  const placeholder2 = '/images/placeholder2.png'
  const placeholder3 = '/images/placeholder3.png'

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
        router.push('/female-health/matronas/programa_5P')
        break
      case 2:
        router.push('/female-health/matronas/visita_postparto')
        break
      case 3:
        router.push('/female-health/matronas/puesta_pendientes')
        break
    }
  }

  return (
    <>
      <NextSeo
        title="CrysDyaz&Co Salud Kids"
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
                <div className={viewport === 'mobile' ? styles.m_topTitle : styles.topTitle}>Matronas</div>
                <div className={viewport === 'mobile' ? styles.m_topDash : styles.topDash} />
                <div className={globalStyles.tinyMCEClass}>
                  <div
                    className={
                      styles.topDescription + ' tinymce-class' + (viewport === 'mobile' ? ' mt-4 mb-1' : ' mt-11 mb-5')
                    }
                  >
                    <p><strong>Blomma</strong> es un proyecto que nace con la ilusión y el objetivo de acompañar a mujeres en su camino hacia la maternidad. Somos Marta, Maritxu y María, tres matronas apasionadas que pretenden acompañarte en la búsqueda de salud para tu embarazo, parto y posparto.</p>
						
                    <p>Queremos que te sientas segura y satisfecha en este camino, para ello te invitamos a que conozcas tus recursos y valores tus necesidades. Nosotras te ofrecemos información científica contrastada, respeto a la fisiología y una mirada integral totalmente individualizada. </p>
            
                  </div>
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
                    onClick={() => handleClick(1)}
                  >
                    <img
                      src={'/images/Matrona_5p.png' || placeholder1}
                      alt=""
                      style={{ width: '100%', height: '150px', opacity: 0.4 }}
                    />
                    <div className={styles.m_serverText}>Programa 5P</div>
                    <div className={styles.m_serverArrow}>
                      <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                    </div>
                  </div>

                  <div
                    className={'relative cursor-pointer w-1/2 '}
                    onMouseOver={() => handleMouseOver('type2')}
                    onClick={() => handleClick(2)}
                  >
                    <img
                      src={'/images/Matrona_postparto.png' || placeholder2}
                      alt=""
                      style={{ width: '100%', height: '150px', opacity: 0.4 }}
                    />
                    <div className={styles.m_serverText}>Visita postparto</div>
                    <div className={styles.m_serverArrow}>
                      <Image src={ArrowRightUpGrayIcon} alt="" width={35} height={28} />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={'relative cursor-pointer w-1/2 '}
                    onMouseOver={() => handleMouseOver('type3')}
                    onClick={() => handleClick(3)}
                  >
                    <img
                      src={'/images/Matrona_pendientes.png' || placeholder3}
                      alt=""
                      style={{ width: '100%', height: '150px', opacity: 0.4 }}
                    />
                    <div className={styles.m_serverText}>Puesta de pendientes</div>
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
                  onClick={() => handleClick(1)}
                >
                  <img
                    src={contactType.type1 ?'/images/Matrona_5p.png': placeholder1}
                    alt=""
                    style={{ width: '100%', height: '288px', opacity: 0.4 }}
                  />

                  <div className={styles.serverText}>Programa 5P: Cerrando el círculo</div>
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
                  onClick={() => handleClick(2)}
                >
                  <img
                    src={contactType.type2 ? '/images/Matrona_postparto.png' : placeholder2}
                    alt=""
                    style={{ width: '100%', height: '288px', opacity: 0.4 }}
                  />
                  <div className={styles.serverText}>Visita postparto</div>
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
                  onClick={() => handleClick(3)}
                >
                  <img
                    src={contactType.type3 ? '/images/Matrona_pendientes.png' : placeholder3}
                    alt=""
                    style={{ width: '100%', height: '288px', opacity: 0.4 }}
                  />
                  <div className={styles.serverText}>Puesta de pendientes </div>
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
