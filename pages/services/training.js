import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'

// styles
import globlaStyle from 'styles/GlobalStyles.module.scss'
import styles from './training.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Training = () => {
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
  const [getCmsServiceSubject, { data: cmsSubjectData, loading: cmsSubjectLoading, error: cmsSubjectError }] =
    useLazyQuery(graphql.queries.getCmsServiceSubject)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const forwardGrayIcon = '/images/arrow-right-gray.svg'
  const [imageOne, setImageOne] = useState('')
  const [imageTwo, setImageTwo] = useState('')
  const [imageThree, setImageThree] = useState('')
  const [activeImage, setActiveImage] = useState('')
  const [activeHover, setActiveHover] = useState(false)

  // handlers
  useEffect(() => {
    getCmsServiceSubject({
      variables: {
        discipline_id: 1,
      },
    })
  }, [])

  useEffect(() => {
    if (!cmsSubjectError && cmsSubjectData && cmsSubjectData.getCmsServiceSubject) {
      setTitle(cmsSubjectData.getCmsServiceSubject.title_two)
      setDescription(cmsSubjectData.getCmsServiceSubject.text)
      setImageOne(cmsSubjectData.getCmsServiceSubject.personal_image[0]?.path)
      setImageTwo(cmsSubjectData.getCmsServiceSubject.online_image[0]?.path)
      setImageThree(cmsSubjectData.getCmsServiceSubject.stream_image[0]?.path)
    }
  }, [cmsSubjectLoading, cmsSubjectData, cmsSubjectError])

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
          pathname: '/buy/buy-person',
          query: { discipline_id: 1, service_type: 'personal' },
        })
        break
      case 'type2':
        router.push({
          pathname: '/buy/buy-plans-online',
          query: { discipline_id: 1, service_type: 'online' },
        })
        break
      case 'type3':
        router.push({
          pathname: '/buy/buy-one-to-one',
          query: { discipline_id: 1, service_type: 'streaming' },
        })
        break
    }
  }

  return (
    <div className={'z-10 ' + styles.container} onMouseMove={handleMouseMover}>
      <div className={'z-0 ' + styles.circleImageCover} id="shark">
        <img src={activeImage} alt="" className={activeHover ? styles.animationImage : styles.circleImage} />
      </div>
      <div className={'flex flex-wrap justify-center pb-20'}>
        <div className={globlaStyle.container}>
          <div className={'mt-9'}>
            <BackButton />
          </div>
          <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 '}>
              <div className={'pt-10 pb-2 ' + styles.topTitle}>{title}</div>
              <div className={styles.topDash} />
              <div
                className={styles.topDescription + ' mt-10 pb-20'}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className={'col-span-12 md:col-span-1 sm:col-span-12'} />
            <div className={'col-span-12 md:col-span-7 sm:col-span-12 relative'}>
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
