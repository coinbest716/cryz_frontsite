import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// third party components
import toast from 'react-hot-toast'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import ArrowButton from 'components/components/academy/ArrowButton'
import Feature from 'components/components/academy/Feature'
import DownloadPDF from 'components/components/academy/DownloadPDF'
import CarouselAcademy from 'components/components/academy/CarouselAcademy'
import BackButton from 'components/components/BackButton'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './course.module.scss'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const Course = () => {
  const router = useRouter()
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
  const [getAcademyWithPlazasById, { data: courseData, loading: courseLoading, error: courseError }] = useLazyQuery(
    graphql.queries.getAcademyWithPlazasById
  )
  const [mainData, setMainData] = useState(null)
  const [feature, setFeature] = useState([])

  // handlers
  useEffect(() => {
    if (!courseError && courseData && courseData.getAcademyWithPlazasById) {
      setMainData(courseData.getAcademyWithPlazasById)
      const temp = courseData.getAcademyWithPlazasById
      setFeature([
        {
          id: 0,
          path: '/images/category.svg',
          bgColor: '#D2DADA',
          topLabel: 'Categoria',
          lowLabel: temp.category || '',
        },
        { id: 1, path: '/images/type.svg', bgColor: '#DFDBD5', topLabel: 'Tipo', lowLabel: temp.type || '' },
        {
          id: 1,
          path: '/images/time.svg',
          bgColor: '#E3BBAA',
          topLabel: 'Tiempo',
          lowLabel: temp.duration || 0 + 'h',
        },
      ])
    }
  }, [courseLoading, courseData, courseError])

  useEffect(() => {
    getAcademyWithPlazasById({ variables: { id: Number(router.asPath.split('/')[2]) } })
  }, [getAcademyWithPlazasById, router.asPath])

  const handleClickPayment = () => {
    toast.error('You did not connected payment!')
    router.push('/purchase-login')
  }
  const handleClickDownlodPDF = () => {
    console.log('handleClickDownlodPDF')
  }

  return (
    <div className={styles.container}>
      <div className={'flex flex-wrap justify-center pb-20'}>
        <div className={globalStyles.container}>
          <div className={'mt-9'}>
            <BackButton />
          </div>
          {mainData && (
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
                <div className={'pt-10 ' + styles.topTitle}>{mainData.name}</div>
                <div className={styles.duration + ' pt-7'}>
                  Duración: {moment(mainData.start_date).format('MMMM')} a{' '}
                  {moment(mainData.end_date).format('MMMM YYYY')}
                </div>
                {/* <div className={'mt-6'} style={{ width: '326px' }}>
                  <ArrowButton
                    plazas={mainData.plazas}
                    label={mainData.price + ' €'}
                    onClick={mainData.plazas ? handleClickPayment : null}
                  />
                </div> */}

                <div className={globalStyles.tinyMCEClass}>
                  <div
                    className={styles.topDescription + ' mt-8 tinymce-class'}
                    dangerouslySetInnerHTML={{ __html: mainData.description }}
                  ></div>
                </div>
              </div>
              <div className={'col-span-12 md:col-span-7 sm:col-span-12 flex justify-end'}>
                <div>
                  <div className={'flex justify-between pt-10'}>
                    {feature.map((item, index) => (
                      <div key={index}>
                        <Feature data={item} />
                      </div>
                    ))}
                    <div>
                      <DownloadPDF onClick={handleClickDownlodPDF} url={mainData.doc} />
                    </div>
                  </div>
                  {mainData.images.length > 0 && (
                    <div className={'pt-10'}>
                      <Image src={mainData.images[0].path} alt="" width={500} height={350} />
                    </div>
                  )}
                  {/* <div className={'pt-10'} style={{ width: '500px' }}>
                    <CarouselAcademy sliderData={mainData.images} />
                    <Image src={item.path} alt="" width={500} height={350} className={styles.slideImage} />
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Course

Course.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
