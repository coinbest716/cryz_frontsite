import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// next components
import Image from 'next/image'
import router from 'next/router'
import dynamic from 'next/dynamic'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import ProgressBar from 'components/components/dashboard/ProgressBar'
import NewMessageBox from 'components/components/dashboard/NewMessageBox'
import Questionnaire from 'components/components/dashboard/Questionnaire'

// third party components
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import toast from 'react-hot-toast'

// styles
import styles from './dashboard.module.scss'

// images and icons
import welcomeIcon from 'public/images/welcome-header.svg'
import bonosIcon from 'public/images/bonos.svg'
import noPendingIcon from 'public/images/no-pending.svg'

// graphql
import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import * as Sentry from '@sentry/nextjs'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const Calendar = dynamic(() => import('react-calendar'), { ssr: false })

const Dashboard = props => {
  const { viewport } = props
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
  const [getPatientByEmail, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPatientByEmail
  )
  const [getAnthropmetryByDashboard, { data: healthData, loading: healthLoading, error: healthError }] = useLazyQuery(
    graphql.queries.getAnthropmetryByDashboard
  )
  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [getPurchaseListByDashboard, { data: bonusData, loading: bonusLoading, error: bonusError }] = useLazyQuery(
    graphql.queries.getPurchaseListByDashboard
  )
  const [
    getPaymentStatusForDashboard,
    { data: paymentStatusData, loading: paymentStatusLoading, error: paymentStatusError },
  ] = useLazyQuery(graphql.queries.getPaymentStatusForDashboard)
  const [
    getWeekDaySessionsByDashboard,
    { data: weekDaySessionsData, loading: weekDaySessionsLoading, error: weekDaySessionsError },
  ] = useLazyQuery(graphql.queries.getWeekDaySessionsByDashboard)
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })
  const [events, setEvents] = useState([])
  const [profilePercentage, setProfilePercentage] = useState(0)
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    lastname: '',
    avatar: '',
    province: '',
    weight: '',
    height: '',
  })
  const [patientID, setPatientID] = useState(-1)
  const [markDate, setMarkDate] = useState([])
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [purchaseData, setPurchaseData] = useState([])
  const today = useSelector(state => state.today)
  const [message, setMessage] = useState([])
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: 'Actividad semanal',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        background: 'transparent',
        foreColor: '#939AAC',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#818E8E',
          shadeTo: 'light',
        },
      },
      xaxis: {
        categories: ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
      },
      grid: {
        show: false,
      },
    },
  })
  const [eventMins, setEventMins] = useState(0)

  const [getPatientMessageById, { data: messageListData, loading: messageListLoading, error: messageListError }] =
    useLazyQuery(graphql.queries.getPatientMessageById)

  const statusArray = [
    {
      id: 0,
      text: 'Quizás nos estemos equivocando, pero parece que tienes un pago pendiente. Compruébalo pinchando a continuación en el botón',
      link: '/dashboard/shopping',
    },
    {
      id: 1,
      text: '¡Muy pronto vas a finalizar tu bono! Consulta tus sesiones y renuévalo pinchando a continuación en el botón',
      link: '/dashboard/shopping',
    },
    {
      id: 2,
      text: '¡Uiii! ¿Es posible que todavía no hayas probado ninguno de nuestros servicios? \n Anímate y consigue todos tus objetivos con el apoyo de nuestros especialistas \n ¡Hoy es el día, ahora el momento!',
      link: '/',
    },
    {
      id: 3,
      text: '¡Hoy es un buen día! \n Sigue haciéndolo tan bien como hasta ahora, y ya verás cómo consigues todo lo que te propongas',
      link: '/',
    },
    {
      id: 4,
      text: 'Este es tu espacio personal desde el que podrás acceder a toda la información sobre pedidos, calendario de sesiones, tu evolución, planes online, clases en directo y otras novedades.',
      link: '/',
    },
  ]

  const [status, setStatus] = useState(0)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [count, setCount] = useState(0)

  // handlers
  useEffect(() => {
    getPatientByEmail({
      variables: {
        email: localStorage.getItem('email'),
      },
    })
  }, [getPatientByEmail])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPatientByEmail) {
      const data = personalData.getPatientByEmail
      setPersonalInfo({
        ...personalInfo,
        name: data.name,
        lastname: data.lastname,
        avatar: data.avatar,
        province: data.bill_province,
      })
      setPatientID(data.id)
      let num = count - 1
      setCount(num)
    } else {
      let num = count + 1
      setCount(num)
    }
  }, [personalLoading, personalData, personalError])

  useEffect(() => {
    if (patientID !== -1) {
      localStorage.setItem('patient_id', patientID)
      getProfilePercentage(personalInfo)
      getSessionsByDashboard({ variables: { patient_id: patientID } })
      getAnthropmetryByDashboard({ variables: { patient_id: patientID } })
      getPurchaseListByDashboard({ variables: { patient_id: patientID } })
      getWeekDaySessionsByDashboard({ variables: { patient_id: patientID } })
      getPatientMessageById({ variables: { patient_id: patientID } })
      getPaymentStatusForDashboard({ variables: { patient_id: patientID } })
    } else if (count === 3 && patientID === -1) {
      toast.error('Please complete your profile.')
      router.push('dashboard/profile')
    }
  }, [
    patientID,
    count,
    getSessionsByDashboard,
    getAnthropmetryByDashboard,
    getPurchaseListByDashboard,
    getWeekDaySessionsByDashboard,
    getPatientMessageById,
    getPaymentStatusForDashboard,
  ])

  useEffect(() => {
    if (!bonusError && bonusData && bonusData.getPurchaseListByDashboard) {
      const data = bonusData.getPurchaseListByDashboard
      setPurchaseData(data)
    }
  }, [bonusLoading, bonusData, bonusError])

  useEffect(() => {
    if (!weekDaySessionsError && weekDaySessionsData && weekDaySessionsData.getWeekDaySessionsByDashboard) {
      const data = weekDaySessionsData.getWeekDaySessionsByDashboard
      let array = []
      try {
        if (data.length === 8) {
          setEventMins(data.at(-1))
          array = [
            {
              name: 'Actividad semanal',
              data: data.slice(0, -1),
            },
          ]
        } else {
          setEventMins(0)
          array = [
            {
              name: 'Actividad semanal',
              data: [0, 0, 0, 0, 0, 0, 0],
            },
          ]
        }
      } catch (error) {
        Sentry.setContext('character', {
          data: data,
        })
        Sentry.captureException(error)
      }
      setChartOptions(chartOptions => ({ ...chartOptions, series: array }))
    }
  }, [weekDaySessionsLoading, weekDaySessionsData, weekDaySessionsError])

  useEffect(() => {
    if (!messageListError && messageListData && messageListData.getPatientMessageById) {
      const data = messageListData.getPatientMessageById
      setMessage(data)
    }
  }, [messageListLoading, messageListData, messageListError])

  useEffect(() => {
    if (!healthError && healthData && healthData.getAnthropmetryByDashboard) {
      const data = healthData.getAnthropmetryByDashboard
      let _personalInfo = { ...personalInfo }
      data.map(item => {
        if (item.name === 'peso' && item.data.length > 0) {
          _personalInfo = { ..._personalInfo, weight: item.data[0].value }
        } else if (item.name === 'altura' && item.data.length > 0) {
          _personalInfo = { ..._personalInfo, height: item.data[0].value }
        }
      })
      setPersonalInfo(_personalInfo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthLoading, healthData, healthError])

  useEffect(() => {
    if (!sessionError && sessionData && sessionData.getSessionsByDashboard) {
      const sessionArr = sessionData.getSessionsByDashboard
      const _events = []
      const _markDate = []
      sessionArr.map(item => {
        const _eventItem = {
          id: item.id,
          title: item.purchase.item_web_name,
          start: item.start_time,
          end: item.end_time,
          backgroundColor: item.location.color,
          textColor: '#ffffff',
          label: item.location.name,
          streaming: item.stream_event,
        }
        _markDate.push(moment(item.start_time).format('DD-MM-YYYY'))
        _events.push(_eventItem)
      })
      setEvents(_events)
      setMarkDate(_markDate)
    }
  }, [sessionLoading, sessionData, sessionError])

  useEffect(() => {
    setAvailableEvent()
    let classInterval = setInterval(() => {
      setAvailableEvent()
    }, 10000)
    return () => {
      clearInterval(classInterval)
    }
  }, [events])

  const setAvailableEvent = () => {
    const currentTime = moment(new Date())
    let count = 0
    events.map(item => {
      const startTime = moment(item.start)
      const endTime = moment(item.end)
      const diffTime = startTime.diff(endTime, 'minutes')
      if (startTime.diff(currentTime, 'minutes') >= diffTime && startTime.diff(currentTime, 'minutes') <= 30) {
        setStreamingEvent({ id: item.id, start: item.start, toggle: item.streaming })
        count++
      } else {
        if (count === 0) {
          setStreamingEvent({ id: -1, start: '', toggle: false })
        }
      }
    })
  }

  useEffect(() => {
    if (!paymentStatusError && paymentStatusData && paymentStatusData.getPaymentStatusForDashboard) {
      const data = paymentStatusData.getPaymentStatusForDashboard
      setStatus(data - 1)
    }
  }, [paymentStatusLoading, paymentStatusData, paymentStatusError])

  const getProfilePercentage = _personalInfo => {
    let fillCount = -6
    Object.values(_personalInfo).map(item => {
      if (item !== '' && item !== undefined) {
        fillCount += 1
      }
    })
    const temp = (fillCount / 14) * 100
    const percentage = Math.ceil(temp / 5) * 5
    if (percentage <= 0) {
      setProfilePercentage(0)
    } else if (percentage >= 100) {
      setProfilePercentage(100)
    } else {
      setProfilePercentage(percentage)
    }
  }

  const handleClickQuestionnaire = () => {
    document.body.style.overflow = 'hidden'
    setShowQuestionnaire(true)
  }
  const handleDisableQuestionnarie = () => {
    document.body.style.overflow = 'auto'
    setShowQuestionnaire(false)
  }

  const handleClickRedirect = (type, id) => {
    switch (type) {
      case 'startClass':
        router.push({
          pathname: '/dashboard/live-streaming',
          query: { id: streamingEvent.id },
        })
        break
      case 'view':
        router.push(id)
        break
      case 'hour':
        router.push('/dashboard/profile#health')
        break
      case 'editProfile':
        router.push('/dashboard/profile')
        break
      case 'iconWeight':
        router.push('/dashboard/profile#health')
        break
      case 'messageBox':
        router.push('/dashboard/message?message_id=' + id)
        break
      case 'calendar':
        router.push('/dashboard/calendar')
        break
      case 'bonos':
        router.push('/dashboard/shopping/order-detail')
        break
    }
  }

  const handleChangeDate = value => {
    setCalendarValue(value)
    const eventDate = moment(value).format('YYYY-MM-DD')
    markDate.map(item => {
      if (item === moment(value).format('DD-MM-YYYY')) {
        router.push({
          pathname: '/dashboard/calendar',
          query: {
            eventDate: eventDate,
          },
        })
      }
    })
  }

  const updateCalendarLabel = label => {
    return label.charAt(0).toUpperCase() + label.slice(1)
  }

  return (
    <div className={'w-full ' + styles.container}>
      <div className={'grid grid-cols-12'}>
        <div className={'col-span-12 lg:col-span-8 pb-0 lg:pb-16 py-4 lg:py-16 px-4 lg:px-9'}>
          <div className={'flex justify-between items-center'}>
            {viewport !== 'mobile' && (
              <div>
                <div className={styles.highBoldLabel}>Dashboard</div>
                <div className={'pt-2 ' + styles.today}>{today}</div>
              </div>
            )}
            {viewport !== 'mobile' && (
              <DashboardButton
                handleClick={() => handleClickRedirect('startClass')}
                label={'Comenzar clase'}
                type={'startClass'}
                visible={streamingEvent.toggle}
              />
            )}
          </div>
          <div className={'flex justify-between items-center mt-7 pl-9 pr-12 ' + styles.welcomeSection}>
            <div className={'py-4'}>
              <div className={styles.welcomeLabel}>Bienvenido</div>
              <div className={styles.welcomeLabel}>
                {personalInfo.name}&nbsp;{personalInfo.lastname}
              </div>
              {viewport !== 'mobile' && (
                <div className={'pt-2 ' + styles.welcomeDescription}>{statusArray[4].text}</div>
              )}
              {/* <div className={'pt-2 ' + styles.welcomeDescription}>{statusArray[status].text}</div> */}
              {/* <div className={'pt-4'}>
                {status !== 3 && status !== 4 ? (
                  <DashboardButton
                    handleClick={() => handleClickRedirect('view', statusArray[status].link)}
                    label={'Ver'}
                    type={'view'}
                  />
                ) : (
                  <></>
                )}
              </div> */}
              {viewport === 'mobile' && (
                <div className="pt-4 flex justify-start items-center">
                  <DashboardButton
                    handleClick={() => handleClickRedirect('startClass')}
                    label={'Comenzar clase'}
                    type={'startClass'}
                    visible={streamingEvent.toggle}
                  />
                  <DashboardButton
                    handleClick={() => handleClickRedirect('message')}
                    label={''}
                    type={'message'}
                    count={message.length}
                  />
                </div>
              )}
            </div>
            {viewport !== 'mobile' && (
              <div style={{ minWidth: '220px' }}>
                <Image src={welcomeIcon} alt="" width={220} height={254} />
              </div>
            )}
          </div>
          <div className={'flex justify-between items-center mt-7 px-9 pt-0 lg:pt-7 pb-1 ' + styles.welcomeSection}>
            <div className={'w-full'}>
              <div className={styles.highBoldLabel}>{viewport === 'mobile' ? 'Porcentajes' : 'Actividad mensual'}</div>
              <div>
                <Chart
                  chart={chartOptions.chart}
                  options={chartOptions?.options}
                  series={chartOptions?.series}
                  type={viewport === 'mobile' ? 'bar' : 'area'}
                  height="200px"
                />
              </div>
            </div>
            {viewport !== 'mobile' && (
              <div className={'px-2 '}>
                <div className={'text-center pb-5 ' + styles.estimateHours}>Este mes</div>
                <DashboardButton
                  handleClick={() => handleClickRedirect('hour')}
                  label={(eventMins / 60).toString().replace('.', ',')}
                  type={'hour'}
                />
              </div>
            )}
          </div>
          {message.length !== 0 ? (
            <div className={'mt-7 mx-9 lg:mx-0 my-7 lg:mt-7 px-9 py-7 flex justify-between ' + styles.rememberSection}>
              <div>
                <div className={styles.remember}>Recuerda!!</div>
                <div className={'pt-2 ' + styles.rememberDescription}>
                  Tienes un cuestionario pendiente de completar…
                </div>
              </div>
              <div>
                <DashboardButton handleClick={() => handleClickQuestionnaire()} label={'Hacerlo'} type={'viewRed'} />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={'grid grid-cols-12 gap-7 '}>
            {viewport !== 'mobile' && (
              <div className={'col-span-12 lg:col-span-6'}>
                <div
                  className={'mt-7 px-9 py-7 w-full ' + styles.welcomeSection + ' calendarWrapper'}
                  // onClick={() => handleClickRedirect('calendar')}
                >
                  <Calendar
                    className={styles.calendar}
                    onChange={handleChangeDate}
                    value={calendarValue}
                    locale="es"
                    tileClassName={({ date, view }) => {
                      if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                        return 'highlight'
                      }
                    }}
                    navigationLabel={({ label }) => updateCalendarLabel(label)}
                  ></Calendar>
                </div>
              </div>
            )}
            <div className={'col-span-12 lg:col-span-6'}>
              <div
                className={'mt-7 px-9 py-7 w-full cursor-pointer ' + styles.welcomeSection}
                onClick={() => handleClickRedirect('bonos')}
              >
                <div className={'flex justify-between items-center'}>
                  <div className={'text-center ' + styles.highBoldLabel}>Mis Bonos</div>
                  <div className={'text-center '}>
                    <Image src={bonosIcon} alt="" width={50} height={50} />
                  </div>
                </div>
                <div>
                  {purchaseData.map((item, index) => (
                    <div className={'py-3 h-full pt-6'} key={index}>
                      <ProgressBar data={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {viewport !== 'mobile' && (
          <div className={'col-span-12 lg:col-span-4 py-4 lg:py-16 px-4 lg:px-9'}>
            <div className={'bg-white h-full px-9 py-10'}>
              <div>
                <div className={styles.highBoldLabel}>Perfil</div>
                <div className={'pt-2 ' + styles.mediumLabel}>{profilePercentage}% Perfil Completado</div>
                <div className={'w-full flex justify-center flex-wrap py-8 text-center'}>
                  <div
                    className={'flex justify-center items-center overflow-hidden p-1'}
                    style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#c9cacd' }}
                  >
                    <Image
                      src={personalInfo.avatar || '/images/default-avatar.svg'}
                      alt=""
                      width={140}
                      height={140}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                  <div className={'w-full pt-4 ' + styles.highBoldLabel}>
                    {personalInfo.name}&nbsp;{personalInfo.lastname}
                  </div>
                  <div className={'pt-2 ' + styles.mediumLabel}>{personalInfo.province}</div>
                  <div className={'pt-6 flex justify-center'}>
                    <DashboardButton
                      handleClick={() => handleClickRedirect('editProfile')}
                      label={'Editar Perfil'}
                      type={'editProfile'}
                    />
                  </div>
                  <div className={'pt-14 flex justify-between'}>
                    <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                      <div className={'absolute -top-4'}>
                        <DashboardButton
                          handleClick={() => handleClickRedirect('iconWeight')}
                          label={''}
                          type={'iconWeight'}
                        />
                        <div className={'pt-2 ' + styles.smallLabel}>Peso</div>
                        <div className={'pt-3 ' + styles.mediumBoldLabel}>
                          {personalInfo.weight && personalInfo.weight + ' kg'}
                        </div>
                      </div>
                    </div>
                    <div className={'relative flex justify-center w-24 h-24 rounded-xl ' + styles.bodyInfo}>
                      <div className={'absolute -top-4'}>
                        <DashboardButton
                          handleClick={() => handleClickRedirect('iconWeight')}
                          label={''}
                          type={'iconHeight'}
                        />
                        <div className={'pt-2 ' + styles.smallLabel}>Altura</div>
                        <div className={'pt-3 ' + styles.mediumBoldLabel}>
                          {personalInfo.height && personalInfo.height + ' cm'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {viewport !== 'mobile' && (
                  <div className={'pt-20'}>
                    <div className={styles.highBoldLabel}>Mensajes</div>
                    {message.length !== 0 ? (
                      <div>
                        <div className={'pt-2 ' + styles.mediumLabel}>Tienes {message.length} mensajes nuevos</div>
                        <div className={'pt-6'}>
                          {message.map((item, index) => (
                            <div className={'py-2 flex justify-center'} key={index}>
                              <NewMessageBox
                                handleClickMessage={() => handleClickRedirect('messageBox', item.id)}
                                name={item.from_name}
                                content={item.subject}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={'pt-7 text-center'}>
                        <Image src={noPendingIcon} alt="" width={268} height={294} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* {viewport === 'mobile' && (
          <div className="col-span-12 lg:col-span-8 py-4 lg:py-16 px-4 lg:px-9">
            <div className={'grid grid-cols-12'}>
              <div className={'col-span-6 px-9 w-full flex flex-wrap justify-center'}>
                <div className={styles.highBoldLabel + ' w-full flex justify-center items-center'}>Perfil</div>
                <div className={'w-full pt-7 flex justify-center'}>
                  <div
                    className={'flex justify-center items-center overflow-hidden p-1'}
                    style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#c9cacd' }}
                  >
                    <Image
                      src={personalInfo.avatar || '/images/default-avatar.svg'}
                      alt=""
                      width={140}
                      height={140}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                </div>
              </div>
              <div className={'col-span-6 px-9'}>
                <div
                  className={'mt-7 px-9 py-7 w-full cursor-pointer ' + styles.welcomeSection}
                  onClick={() => handleClickRedirect('bonos')}
                >
                  <div className={'flex justify-between items-center'}>
                    <div className={'text-center ' + styles.highBoldLabel}>Mis Bonos</div>
                    <div className={'text-center '}>
                      <Image src={bonosIcon} alt="" width={50} height={50} />
                    </div>
                  </div>
                  <div>
                    {purchaseData.map((item, index) => (
                      <div className={'py-3 h-full pt-6'} key={index}>
                        <ProgressBar data={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
        {viewport === 'mobile' && (
          <div className={'col-span-12 mb-40'}>
            <div
              className={'mt-7 px-9 py-7 w-full ' + styles.welcomeSection + ' calendarWrapper'}
              // onClick={() => handleClickRedirect('calendar')}
            >
              <Calendar
                className={styles.calendar}
                onChange={handleChangeDate}
                value={calendarValue}
                locale="es"
                tileClassName={({ date, view }) => {
                  if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                    return 'highlight'
                  }
                }}
                navigationLabel={({ label }) => updateCalendarLabel(label)}
              ></Calendar>
            </div>
          </div>
        )}
      </div>
      {showQuestionnaire && <Questionnaire onClick={() => handleDisableQuestionnarie()} viewport={viewport} />}
    </div>
  )
}
export default Dashboard

Dashboard.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Dashboard">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
