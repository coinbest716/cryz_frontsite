import React, { useState, useEffect } from 'react'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// third party components
import { useDispatch } from 'react-redux'
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

const Course = props => {
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
  const [getAcademyWithPlazasById, { data: courseData, loading: courseLoading, error: courseError }] = useLazyQuery(
    graphql.queries.getAcademyWithPlazasById
  )
  const [mainData, setMainData] = useState('')
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
          topLabel: 'Horas',
          lowLabel: temp.duration || 0 + 'h',
        },
      ])
    }
  }, [courseLoading, courseData, courseError])

  useEffect(() => {
    if (router.query.id !== undefined) {
      getAcademyWithPlazasById({ variables: { id: Number(router.query.id) } })
    }
  }, [getAcademyWithPlazasById, router.query])

  const handleClickPayment = () => {
    router.push({
      pathname: '/purchase',
      query: {
        service_id: mainData.list[0].id,
        tab: 0,
        image: mainData.images[0].path,
        description: mainData.list[0].description,
        price: mainData.list[0].price,
      },
    })
  }
  const handleClickDownlodPDF = () => {
    console.log('handleClickDownlodPDF')
  }

  return (
    <div className={styles.container}>
      <div className={'flex flex-wrap justify-center'}>
        {viewport === 'mobile' && mainData !== '' && (
          <div>
            <CarouselAcademy sliderData={mainData.images} />
          </div>
        )}
        <div className={globalStyles.container + ' z-10'}>
          <div className={'absolute top-24'}>
            <BackButton viewport={viewport} />
          </div>
          {mainData && viewport !== 'mobile' && (
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-12 md:col-span-5 sm:col-span-12 '}>
                <div className={'pt-32 ' + styles.topTitle}>{mainData.name}</div>
                <div className={styles.duration + ' pt-7'}>
                  Duración: {moment(mainData.start_date).format('MMMM')} a{' '}
                  {moment(mainData.end_date).format('MMMM YYYY')}
                </div>
                {mainData.plazas && (
                  <div className={'mt-6'} style={{ width: '326px' }}>
                    <ArrowButton
                      plazas={mainData.plazas}
                      label={mainData.price + ' €'}
                      onClick={mainData.plazas ? handleClickPayment : null}
                      viewport={viewport}
                    />
                  </div>
                )}
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
                </div>
              </div>
            </div>
          )}
          {mainData && viewport === 'mobile' && (
            <div className={'grid grid-cols-12 gap-4 mx-2 p-4 pb-6 -mt-10 z-10 bg-white'}>
              <div className={'col-span-12'}>
                <div className={styles.topTitle}>{mainData.name}</div>
                <div className={styles.duration + ' pt-7'}>
                  Duración: {moment(mainData.start_date).format('MMMM')} a{' '}
                  {moment(mainData.end_date).format('MMMM YYYY')}
                </div>
                {mainData.plazas && (
                  <div className={'mt-6'} >
                    <ArrowButton
                      plazas={mainData.plazas}
                      label={mainData.price + ' €'}
                      onClick={mainData.plazas ? handleClickPayment : null}
                      viewport={viewport}
                    />
                  </div>
                )}
                <div className={globalStyles.tinyMCEClass}>
                  <div
                    className={styles.topDescription + ' mt-8 tinymce-class'}
                    dangerouslySetInnerHTML={{ __html: mainData.description }}
                  ></div>
                </div>
              </div>
              <div className={'col-span-12 flex flex-wrap justify-center'}>
                <div className={'w-full flex justify-between pt-10'}>
                  {feature.map((item, index) => (
                    <div key={index}>
                      <Feature data={item} />
                    </div>
                  ))}
                </div>
                <div className="mt-11">
                  <DownloadPDF onClick={handleClickDownlodPDF} url={mainData.doc} />
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
