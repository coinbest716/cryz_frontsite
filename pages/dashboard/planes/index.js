import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'
import dynamic from 'next/dynamic'

// third party components
import ReactPlayer from 'react-player'
import 'react-calendar/dist/Calendar.css'
import toast from 'react-hot-toast'
import { Auth } from 'aws-amplify'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Material from 'components/components/dashboard/Material'
import Feature from 'components/components/academy/Feature'
import DownloadPDF from 'components/components/academy/DownloadPDF'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './planes.module.scss'

// images and icons
import downIcon from 'public/images/down.svg'

// json data
import MonthListData from 'assets/data/MonthListData.json'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Calendar = dynamic(() => import('react-calendar'), { ssr: false })

const Planes = () => {
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
  const [plansOnlineData, setPlansOnlineData] = useState({})
  const [selectedVideo, setSelectedVideo] = useState({})
  const [materialData, setMaterialData] = useState([])
  const [feature, setFeature] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const [dateISOString, setDateISOSTring] = useState(new Date().toISOString())
  const [currentMonth, setCurrentMonth] = useState('')
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getOnlinePlanByDashboard, { data: onlinePlanData, loading: onlinePlanLoading, error: onlinePlanError }] =
    useLazyQuery(graphql.queries.getOnlinePlanByDashboard)
  const [getVideoMaterial, { data: videoMaterialData, loading: videoMaterailLoading, error: videoMaterialError }] =
    useLazyQuery(graphql.queries.getVideoMaterial)

  // handlers
  useEffect(() => {
    setCurrentMonth(MonthListData[new Date().getMonth()].month)
  }, [])

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(response => {
        if (response?.attributes?.email) {
          getPatientByEmail({
            variables: {
              email: response.attributes.email,
            },
          })
        }
      })
      .catch(error => {
        toast.error(error.message)
        router.push('/')
      })
  }, [getPatientByEmail])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      if (personalData === null) {
        toast.error('Please insert your personal information in Profile page.')
        router.push('/dashboard/profile')
      } else {
        getOnlinePlanByDashboard({
          variables: {
            patient_id: personalData.getPatientByEmail.id,
            select_date: dateISOString,
          },
        })
      }
    }
  }, [getOnlinePlanByDashboard, dateISOString, personalLoading, personalData, personalError])

  useEffect(() => {
    if (!onlinePlanError && onlinePlanData && onlinePlanData.getOnlinePlanByDashboard) {
      if (JSON.stringify(onlinePlanData.getOnlinePlanByDashboard) !== JSON.stringify({})) {
        setPlansOnlineData(onlinePlanData.getOnlinePlanByDashboard)
        setSelectedVideo(onlinePlanData.getOnlinePlanByDashboard.routine.sections[0].videos[0])
      } else {
        setSelectedVideo({})
      }
    } else {
      setPlansOnlineData({})
    }
  }, [onlinePlanLoading, onlinePlanData, onlinePlanError])

  useEffect(() => {
    if (JSON.stringify(selectedVideo) !== JSON.stringify({})) {
      setFeature([
        {
          id: 0,
          path: '/images/category.svg',
          bgColor: '#D2DADA',
          topLabel: 'Nivel',
          lowLabel: selectedVideo.effort_level,
        },
        { id: 1, path: '/images/type.svg', bgColor: '#DFDBD5', topLabel: 'Tandas', lowLabel: selectedVideo.time },
        {
          id: 2,
          path: '/images/time.svg',
          bgColor: '#E3BBAA',
          topLabel: 'Descanso',
          lowLabel: selectedVideo.break + 'seg',
        },
        {
          id: 3,
          path: '/images/star.svg',
          bgColor: '#F5DEC2',
          topLabel: 'Peso',
          lowLabel: selectedVideo.weight + 'kg',
        },
      ])
      getVideoMaterial({
        variables: {
          video_id: selectedVideo.id,
        },
      })
    }
  }, [selectedVideo])

  useEffect(() => {
    if (!videoMaterialError && videoMaterialData && videoMaterialData.getVideoMaterial) {
      setMaterialData(videoMaterialData.getVideoMaterial)
    }
  }, [videoMaterailLoading, videoMaterialData, videoMaterialError])

  const handleClickMonth = () => {
    setShowCalendar(!showCalendar)
  }

  const handleChangeDate = value => {
    setDate(value)
    setDateISOSTring(value.toISOString())
    setShowCalendar(false)
  }

  const updateCalendarLabel = label => {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return (
    <div className={globalStyles.dashContainer}>
      <div className={'flex justify-between'}>
        <div>
          <div className={styles.highBoldLabel}>Planes online</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <NotificationButton />
          {/* <Profile /> */}
        </div>
      </div>
      <div className={'grid grid-cols-12 gap-8'}>
        <div className={'col-span-12 md:col-span-9 sm:col-span-12'}>
          <div className={'flex items-center'}>
            <div className={styles.chapter}>Chapter 2 &nbsp; </div>
            <div className={styles.dot}></div>
            <div className={styles.chapterTitle}>{plansOnlineData.name}</div>
          </div>
          <div className={'pt-6'}>
            {JSON.stringify(selectedVideo) !== JSON.stringify({}) ? (
              <ReactPlayer
                url={selectedVideo.link}
                width="100%"
                height="100%"
                className={styles.reactPlayer}
                controls={true}
              />
            ) : (
              <></>
            )}
          </div>

          <div className={'flex flex-wrap justify-between pt-12 gap-4'}>
            <div className={styles.blockSection + ' flex flex-wrap justify-between items-center px-5 py-5'}>
              <div className={styles.blackName + ' py-2 pr-4'}>Información del bloque</div>
              <div className={'flex justify-end flex-1'}>
                {feature.map((item, index) => (
                  <div key={index} className={'pl-4 lg:px-5'}>
                    <Feature data={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className={'hidden lg:flex'}>
              <DownloadPDF data={plansOnlineData?.routine?.document[0]} type={'plan'} />
            </div>
          </div>

          <div className={styles.noteSection + ' mt-5 px-4 py-8 block lg:hidden'}>
            <div className={styles.notes}>Notas :</div>
            <div className={styles.noteDescription}>{plansOnlineData?.routine?.sections[0]?.details}</div>
          </div>

          <div className={'w-full flex pt-7'}>
            <div className={'mr-8 px-8 py-5 ' + styles.materialSection}>
              <div className={styles.materialTitle + ' pb-2'}>Material necesario</div>
              {materialData?.map((item, index) => (
                <div className={'py-2'} key={index}>
                  <div className={styles.label}>{item.name}</div>
                  <div className={styles.description}>{item.details}</div>
                </div>
              ))}
            </div>
            <div className={'hidden lg:block px-4 py-8 ' + styles.noteSection}>
              <div className={styles.notes}>Notas :</div>
              <div className={styles.noteDescription}>{plansOnlineData?.routine?.sections[0]?.details}</div>
            </div>
            <div className={'flex justify-end lg:hidden'}>
              <DownloadPDF data={plansOnlineData?.routine?.document[0]} type={'plan'} />
            </div>
          </div>
        </div>
        <div className={'col-span-12 md:col-span-3 sm:col-span-12'}>
          <div className={'rounded-xl bg-white py-4 px-6 pb-10 mt-10 relative'}>
            <div className={'flex justify-between items-center'}>
              <div className={styles.monthName}>{currentMonth}</div>
              <div
                className={'flex items-center pl-4 pr-2 py-1 cursor-pointer ' + styles.monthPickerSection}
                onClick={handleClickMonth}
              >
                <div className={styles.monthSelect + ' pr-3'}>Mes</div>
                <Image src={downIcon} alt="" width={7} height={7} />
              </div>
            </div>
            <div className={'calendarWrapper'}>
              <Calendar
                className={showCalendar ? '' : 'hidden'}
                value={date}
                onChange={handleChangeDate}
                showDoubleView={false}
                showNavigation={true}
                locale="es"
                navigationLabel={({ label }) => updateCalendarLabel(label)}
              />
            </div>
            {plansOnlineData?.routine?.sections?.map((item, index) => (
              <div key={index}>
                <div className={styles.videoMaterialTitle + ' pt-8'}>{item.name}</div>
                <div className={'pt-7'}>
                  {item.videos.map((video, index) => (
                    <div className={'py-2'} key={index}>
                      <Material
                        item={video}
                        selectedVideo={selectedVideo}
                        type={'green'}
                        onClick={data => setSelectedVideo(data)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.videoMaterialTitle + ' pt-8'}>ABDOMINALES</div>
            {/* <div className={'pt-7'}>
              {greenMaterials.map((item, index) => (
                <div className={'py-2'} key={index}>
                  <Material item={item} type={'green'} />
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Planes

Planes.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
