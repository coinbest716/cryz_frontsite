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
import moment from 'moment'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Material from 'components/components/dashboard/Material'
import Feature from 'components/components/academy/Feature'
import DownloadPDF from 'components/components/academy/DownloadPDF'
import NoPlansOnlineDailog from 'components/components/dashboard/plans/NoPlansOnlineDialog'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './plans.module.scss'

// images and icons
import downIcon from 'public/images/down.svg'

// json data
import MonthListData from 'assets/data/MonthListData.json'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Calendar = dynamic(() => import('react-calendar'), { ssr: false })

const Plans = props => {
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
  const [bool, setBool] = useState(false)
  const [patientID, setPatientID] = useState(-1)
  const [plansOnlineData, setPlansOnlineData] = useState({})
  const [selectedDetails, setSelectedDetails] = useState('')
  const [selectedVideo, setSelectedVideo] = useState({})
  const [selectedVideoLink, setSelectedVideoLink] = useState('')
  const [materialData, setMaterialData] = useState([])
  const [feature, setFeature] = useState([])
  const [showCalendar, setShowCalendar] = useState(true)
  const [date, setDate] = useState(new Date())
  const [markDate, setMarkDate] = useState([])
  const [currentMonth, setCurrentMonth] = useState('')
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getOnlinePlanByDashboard, { data: onlinePlanData, loading: onlinePlanLoading, error: onlinePlanError }] =
    useLazyQuery(graphql.queries.getOnlinePlanByDashboard)
  const [getVideoLinkById, { data: videoLinkData, loading: videoLinkLoading, error: videoLinkError }] = useLazyQuery(
    graphql.queries.getVideoLinkById
  )
  const [getVideoMaterial, { data: videoMaterialData, loading: videoMaterailLoading, error: videoMaterialError }] =
    useLazyQuery(graphql.queries.getVideoMaterial)

  const [
    getAvailablePlanDates,
    { data: availablePlanDatesData, loading: availablePlanDatesLoading, error: availablePlanDatesError },
  ] = useLazyQuery(graphql.queries.getAvailablePlanDates)

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
        setPatientID(personalData.getPatientByEmail.id)
      }
    }
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (patientID !== -1) {
      getAvailablePlanDates({
        variables: {
          patient_id: patientID,
        },
      })
    }
  }, [getAvailablePlanDates, patientID])

  useEffect(() => {
    if (patientID !== -1) {
      getOnlinePlanByDashboard({
        variables: {
          patient_id: patientID,
          select_date: moment(date).format('YYYY-MM-DDTHH:mm:ssZ'),
        },
      })
    }
  }, [date, patientID, getOnlinePlanByDashboard])

  useEffect(() => {
    if (!onlinePlanError && onlinePlanData && onlinePlanData.getOnlinePlanByDashboard) {
      if (JSON.stringify(onlinePlanData.getOnlinePlanByDashboard) !== JSON.stringify({})) {
        setPlansOnlineData(onlinePlanData.getOnlinePlanByDashboard)
        setSelectedVideo(onlinePlanData.getOnlinePlanByDashboard.routine.sections[0].videos[0])
        setSelectedDetails(onlinePlanData.getOnlinePlanByDashboard.routine.sections[0].details)
      } else {
        setPlansOnlineData({})
        setSelectedVideo({})
      }
    } else {
      setPlansOnlineData({})
      setSelectedVideo({})
    }
  }, [onlinePlanLoading, onlinePlanData, onlinePlanError])

  useEffect(() => {
    if (JSON.stringify(selectedVideo) !== JSON.stringify({})) {
      if (selectedVideo.link === null || selectedVideo.link === undefined || selectedVideo === '') {
        getVideoLinkById({
          variables: {
            video_id: selectedVideo.id,
          },
        })
      } else {
        setSelectedVideoLink(selectedVideo.link)
      }
    }
  }, [selectedVideo])

  useEffect(() => {
    if (!videoLinkError && videoLinkData && videoLinkData.getVideoLinkById) {
      setSelectedVideoLink(videoLinkData.getVideoLinkById)
    }
  }, [videoLinkLoading, videoLinkData, videoLinkError])

  useEffect(() => {
    if (!availablePlanDatesError && availablePlanDatesData && availablePlanDatesData.getAvailablePlanDates) {
      const _markDate = []
      availablePlanDatesData.getAvailablePlanDates.map(item => {
        _markDate.push(moment(item).format('DD-MM-YYYY'))
      })
      setMarkDate(_markDate)
    } else {
      setMarkDate([])
    }
  }, [availablePlanDatesLoading, availablePlanDatesData, availablePlanDatesError])

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
        {
          id: 1,
          path: '/images/type.svg',
          bgColor: '#DFDBD5',
          topLabel: 'Repetición',
          lowLabel: selectedVideo.repetitions,
        },

        {
          id: 4,
          path: '/images/time.svg',
          bgColor: '#F5DEC2',
          topLabel: 'Tiempo',
          lowLabel: selectedVideo.time + ' seg',
        },
        {
          id: 2,
          path: '/images/time.svg',
          bgColor: '#E3BBAA',
          topLabel: 'Descanso',
          lowLabel: selectedVideo.break + ' seg',
        },
        {
          id: 3,
          path: '/images/star.svg',
          bgColor: '#F5DEC2',
          topLabel: 'Peso',
          lowLabel: selectedVideo.weight + ' kg',
        },
      ])
      getVideoMaterial({
        variables: {
          video_id: selectedVideo.id,
        },
      })
    }
  }, [selectedVideo, getVideoMaterial])

  useEffect(() => {
    if (!videoMaterialError && videoMaterialData && videoMaterialData.getVideoMaterial) {
      setMaterialData(videoMaterialData.getVideoMaterial)
    }
  }, [videoMaterailLoading, videoMaterialData, videoMaterialError])

  useEffect(() => {
    if (!bool) {
      if (JSON.stringify(plansOnlineData) === JSON.stringify({})) {
        if (markDate.length !== 0) {
          let array = []
          markDate.map((item, index) =>
            array.push(new Date(item.split('-')[2], item.split('-')[1] - 1, item.split('-')[0]))
          )
          const newArray = array.sort((a, b) => a - b)
          for (let i = 1; i < newArray.length; i++) {
            if (new Date() < newArray[i - 1]) {
              setDate(newArray[i - 1])
              break
            } else if (new Date() > newArray[i - 1] && new Date() < newArray[i]) {
              setDate(newArray[i - 1])
              break
            } else {
              setDate(newArray[i])
            }
          }
          setBool(true)
        }
      }
    }
  }, [markDate, plansOnlineData, bool])

  const handleClickMonth = () => {
    setShowCalendar(!showCalendar)
  }

  const handleChangeDate = value => {
    if (markDate.length !== 0) {
      let array = []
      markDate.map((item, index) =>
        array.push(new Date(item.split('-')[2], item.split('-')[1] - 1, item.split('-')[0]))
      )
      const newArray = array.sort((a, b) => a - b)
      let temp = new Date()
      for (let i = 0; i < newArray.length; i++) {
        if (value.getTime() < newArray[i].getTime()) {
          if (i === 0) {
            temp = newArray[0]
            break
          } else {
            temp = newArray[i - 1]
          }
        } else if (value.getTime() === newArray[i].getTime()) {
          temp = newArray[i]
          break
        } else {
          if (value.getTime() > newArray[i - 1]) {
            temp = newArray[i]
          } else {
            temp = newArray[i - 1]
          }
        }
      }
      setDate(temp)
    }
    setShowCalendar(true)
  }

  const updateCalendarLabel = label => {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return viewport !== 'mobile' ? (
    <div className={globalStyles.dashContainer}>
      <div className={'flex justify-between'}>
        <div>
          <div className={styles.highBoldLabel}>Planes online</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <NotificationButton />
        </div>
      </div>
      {JSON.stringify(plansOnlineData) !== JSON.stringify({}) ? (
        <div className={'w-full flex'}>
          <div style={{ flex: 1 }}>
            <div className={'flex items-center'}>
              <div className={styles.chapterTitle}>{plansOnlineData.name}</div>
            </div>
            <div className={'pt-6'}>
              {selectedVideoLink !== '' ? (
                <ReactPlayer
                  url={selectedVideoLink}
                  width="100%"
                  height="100%"
                  className={styles.reactPlayer}
                  controls={true}
                  loop={true}
                  muted={true}
                  playing={true}
                />
              ) : (
                <></>
              )}
            </div>

            <div className={'flex flex-wrap justify-between pt-12'}>
              <div className={styles.blockSection + ' flex flex-wrap justify-between items-center px-5 py-5'}>
                <div className={styles.blackName + ' py-2 pr-4'}>Información del video</div>
                <div className={'flex flex-wrap justify-between'}>
                  {feature.map((item, index) => (
                    <div key={index} className={'pl-4 lg:px-5'}>
                      <Feature data={item} />
                    </div>
                  ))}
                </div>
              </div>
              {JSON.stringify(plansOnlineData?.routine?.document[0]) !== JSON.stringify({}) ? (
                <div className={'hidden lg:flex'}>
                  <DownloadPDF data={plansOnlineData?.routine?.document[0]} type={'plan'} />
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className={styles.noteSection + ' mt-5 px-4 py-8 block lg:hidden'}>
              <div className={styles.notes}>Notas:</div>
              <div className={styles.noteDescription}>{selectedDetails}</div>
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
                <div className={styles.notes}>Notas:</div>
                <div className={styles.noteDescription}>{selectedDetails}</div>
              </div>
              <div className={'flex justify-end lg:hidden'}>
                <DownloadPDF data={plansOnlineData?.routine?.document[0]} type={'plan'} />
              </div>
            </div>
          </div>
          <div style={{ width: 300, marginLeft: 26 }}>
            <div className={'rounded-xl bg-white py-4 px-6 pb-10 mt-10 relative'}>
              <div className={'flex justify-between items-center'}>
                <div className={styles.monthName}></div>
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
                  tileClassName={({ date, view }) => {
                    if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                      return 'highlight'
                    }
                  }}
                />
              </div>
              {/* sub video list */}
              <div className={styles.subVideoArea + ' pt-4'}>
                <PerfectScrollbar>
                  {plansOnlineData?.routine?.sections?.map((item, index) => (
                    <div
                      key={index}
                      className="py-4"
                      onClick={() => {
                        setSelectedDetails(item.details)
                      }}
                    >
                      <div className={styles.videoMaterialTitle}>{item.name}</div>
                      <div className={'pt-7'}>
                        {item.videos.map((video, index) => (
                          <div className={'py-2'} key={index}>
                            <Material
                              item={video}
                              selectedVideo={selectedVideo}
                              /*type={'green'}*/
                              onClick={data => setSelectedVideo(data)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoPlansOnlineDailog viewport={viewport} />
      )}
    </div>
  ) : (
    <>mobile view</>
  )
}
export default Plans

Plans.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Planes online">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
