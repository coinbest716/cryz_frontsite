import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import ServiceButton from 'components/components/service/ServiceButton'
import CarouselService from 'components/components/service/CarouselService'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from '../training.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Training = props => {
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

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const forwardGrayIcon = '/images/arrow-right-gray.svg'
  const [sliderData, setSliderData] = useState([])
  const [imageOne, setImageOne] = useState('')
  const [imageTwo, setImageTwo] = useState('')
  const [imageThree, setImageThree] = useState('')
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

  const handleMouseOver = type => {
    setActiveHover(true)
    switch (type) {
      case 'type1':
        setActiveImage(imageOne)
        break
      case 'type2':
        setActiveImage(imageTwo)
        break
      case 'type3':
        setActiveImage(imageThree)
        break
    }
  }

  const handleMouseLeave = type => {
    setActiveHover(false)
  }

  const handleClick = type => {
    switch (type) {
      case 'type1':
        router.push({
          pathname: '/salud-kids/asesoria-de-la-lactancia/servicios/personal',
          query: { discipline_id: 1, service_type: 'personal', type: 'service', image: imageOne || '' },
        })
        break
      case 'type2':
        router.push({
          pathname: '/salud-kids/asesoria-de-la-lactancia/servicios/online',
          query: { discipline_id: 1, service_type: 'online', type: 'service', image: imageTwo || '' },
        })
        break
      case 'type3':
        router.push({
          pathname: '/salud-kids/asesoria-de-la-lactancia/servicios/streaming',
          query: { discipline_id: 1, service_type: 'streaming', type: 'service', image: imageThree || '' },
        })
        break
    }
  }

  return (
    <div
      className={'z-10 ' + (viewport === 'mobile' ? styles.m_container : styles.container)}
      onMouseMove={viewport === 'mobile' ? () => {} : handleMouseMover}
    >
      {viewport === 'mobile' ? (
        <div></div>
      ) : (
        <div className={'z-0 ' + styles.circleImageCover} id="shark">
          {activeImage === '' ? (
            <div></div>
          ) : (
            <img src={activeImage} alt="" className={activeHover ? styles.animationImage : styles.circleImage} />
          )}
        </div>
      )}
      <div className={'flex flex-wrap justify-center ' + (viewport === 'mobile' ? ' pb-4' : ' pb-20')}>
        <div className={globalStyles.container}>
          <div className={'mt-9'}>
            <BackButton />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 '}>
              <div className={viewport === 'mobile' ? styles.m_topTitle : styles.topTitle}>aqui va un titulo</div>
              <div className={viewport === 'mobile' ? styles.m_topDash : styles.topDash} />
              <div className={globalStyles.tinyMCEClass}>
                <div
                  className={
                    styles.topDescription + ' tinymce-class' + (viewport === 'mobile' ? ' mt-5' : ' mt-10 pb-20')
                  }
                >
                  aqui va texto
                </div>
              </div>
            </div>
            {viewport === 'mobile' ? (
              <div className={'col-span-12 '}>
                <div className={'w-2/3 py-2'}>
                  <ServiceButton label={'Compra Presenciales'} onClick={() => handleClick('type1')} />
                </div>
                <div className={'w-2/3 py-2'}>
                  <ServiceButton
                    label={'Compra Planes online'}
                    onClick={() => handleClick('type2')}
                    type={'training'}
                  />
                </div>
                <div className={'w-2/3 py-2'}>
                  <ServiceButton
                    label={'Compra 1 to 1 streaming'}
                    onClick={() => handleClick('type3')}
                    type={'training'}
                  />
                </div>
                <div className={styles.m_carouselSection}>
                  <CarouselService sliderData={sliderData} viewport={viewport} />
                </div>
              </div>
            ) : (
              <div className={'col-span-12 md:col-span-1 sm:col-span-12'} />
            )}
            <div className={'col-span-12 md:col-span-7 sm:col-span-12 relative'}>
              {viewport === 'mobile' ? (
                <div></div>
              ) : (
                <div className={'flex h-full'}>
                  <div className={'w-1/3 px-12 '}>
                    <div
                      className={'h-full relative ' + styles.activeSection}
                      onMouseOver={() => handleMouseOver('type1')}
                      onMouseLeave={() => handleMouseLeave('type1')}
                    >
                      <div className={'w-1/3 absolute ' + styles.verticalText} onClick={() => handleClick('type1')}>
                        <span className={styles.number}>01&nbsp;&nbsp;</span>
                        <span className={styles.typograph}>Personal&nbsp;</span>
                        <img
                          src={forwardGrayIcon}
                          alt=""
                          className={styles.arrowIcon}
                          style={{ width: '35px', height: '28px', minWidth: '35px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={'w-1/3 px-12'}>
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
                  <div className={'w-1/3 px-12'}>
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
              )}
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
