import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useDispatch } from 'react-redux'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import NutritionItem from 'components/components/dashboard/nutrition/NutritionItem'
import MobileNutritionItem from 'components/components/dashboard/nutrition/MobileNutritionItem'

import moment from 'moment'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-calendar/dist/Calendar.css'
const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })

import DashboardButton from 'components/components/dashboard/DashboardButton'
import NotificationButton from 'components/components/dashboard/NotificationButton'

import plansIcon from 'assets/images/plans.svg'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

import styles from './nutrition.module.scss'

const Nutrition = props => {
  const { viewport } = props
  const router = useRouter()
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

  const [nutritions, setNutritions] = useState([])
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })
  const [nutritionStatus, setNutritionStatus] = useState(false)

  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [getNutritionsForDashboard, { data: nutritionData, loading: nutritionLoading, error: nutritionError }] =
    useLazyQuery(graphql.queries.getNutritionsForDashboard)

  const [getNutritionPurchaseStatus, { data: statusData, loading: statusLoading, error: statusError }] = useLazyQuery(
    graphql.queries.getNutritionPurchaseStatus
  )

  useEffect(() => {
    getSessionsByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    getNutritionsForDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    getNutritionPurchaseStatus({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAvailableEvent()
    let classInterval = setInterval(() => {
      setAvailableEvent
    }, 10000)
    return () => {
      clearInterval(classInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const setAvailableEvent = () => {
    const currentTime = moment(new Date())
    events.map(item => {
      const startTime = moment(item.start)
      const endTime = moment(item.end)
      const diffTime = startTime.diff(endTime, 'minutes')
      if (startTime.diff(currentTime, 'minutes') >= diffTime && startTime.diff(currentTime, 'minutes') <= 5) {
        setStreamingEvent({ id: item.id, start: item.start, toggle: item.streaming })
      } else {
        setStreamingEvent({ id: -1, start: '', toggle: false })
      }
    })
  }

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
    if (!nutritionError && nutritionData && nutritionData.getNutritionsForDashboard) {
      let _nutritions = nutritionData.getNutritionsForDashboard
      let result = _nutritions.map(function (el) {
        let obj = Object.assign({}, el)
        obj.collapse = true
        return obj
      })
      setNutritions(result)
    }
  }, [nutritionLoading, nutritionData, nutritionError])

  useEffect(() => {
    if (!statusError && statusData && statusData.getNutritionPurchaseStatus) {
      setNutritionStatus(statusData.getNutritionPurchaseStatus)
    }
  }, [statusLoading, statusData, statusError])

  const handleClickStartClass = () => {
    router.push({
      pathname: '/dashboard/live-streaming',
      query: { id: streamingEvent.id },
    })
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

  const handleClickDocument = fileUrl => {
    let fileName = fileUrl.includes('amazonaws') ? fileUrl.split('_')[1] : fileUrl
    var a = document.createElement('a')
    a.href = fileUrl
    a.setAttribute('download', fileName)
    a.click()
  }

  const handleClickCollpase = index => {
    let _nutritions = [...nutritions]
    _nutritions[index].collapse = !_nutritions[index].collapse
    setNutritions(_nutritions)
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={'p-4 mb-32 ' + styles.m_container}>
          <DashboardButton
            handleClick={handleClickStartClass}
            label={'Clase'}
            type={'startClass'}
            visible={streamingEvent.toggle}
          />
          <div className="flex justify-center">
            <div className={'calendarWrapper mt-4'} style={{ maxWidth: '350px' }}>
              <MonthCalendar
                className={styles.calendar}
                onChange={handleChangeDate}
                value={calendarValue}
                locale="es-MX"
                tileClassName={({ date, view }) => {
                  if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                    return 'highlight'
                  }
                }}
              />
            </div>
          </div>
          <div>
            <div className={'flex justify-evenly items-center mt-3'}>
              <div className={'w-1/5 text-center ' + styles.m_tableHeadTitle}>DIA</div>
              <div className={'w-3/5 text-center ' + styles.m_tableHeadTitle}>NOMBRE</div>
              <div className={'w-1/5 text-center ' + styles.m_tableHeadTitle}>VISTA</div>
            </div>
            {nutritions.map((item, index) => (
              <MobileNutritionItem
                key={index}
                item={item}
                index={index}
                handleClickCollpase={handleClickCollpase}
                handleClickDocument={handleClickDocument}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {nutritionStatus ? (
            <div className={'p-10 ' + styles.container}>
              <div className={'flex'}>
                <div className={'flex flex-1 mr-10'}>
                  <div className={styles.highBoldLabel}>Nutrición</div>
                </div>
                <div style={{ width: '350px' }} className="flex justify-between">
                  <DashboardButton
                    handleClick={handleClickStartClass}
                    label={'Comenzar clase'}
                    type={'startClass'}
                    visible={streamingEvent.toggle}
                  />
                  <NotificationButton />
                </div>
              </div>
              <div className={'flex mt-10'}>
                <div className={'flex flex-1'}>
                  <div className={'w-full mr-10'}>
                    <div className={'flex justify-evenly items-center mb-4 ' + styles.tableHead}>
                      <div style={{ width: '90px' }} className={'text-center ' + styles.tableHeadTitle}>
                        VISTA
                      </div>
                      <div style={{ width: '90px' }} className={'text-center ' + styles.tableHeadTitle}>
                        FECHA
                      </div>
                      <div className={'flex-1 ' + styles.tableHeadTitle}>NOMBRE</div>
                    </div>
                    <div style={{ height: 'calc(100vh - 300px)' }}>
                      <PerfectScrollbar>
                        {nutritions.map((item, index) => (
                          <NutritionItem
                            key={index}
                            item={item}
                            index={index}
                            handleClickCollpase={handleClickCollpase}
                            handleClickDocument={handleClickDocument}
                          />
                        ))}
                      </PerfectScrollbar>
                    </div>
                  </div>
                </div>
                <div style={{ width: '350px' }}>
                  <div className={'calendarWrapper'} style={{ maxWidth: '350px' }}>
                    <MonthCalendar
                      className={styles.calendar}
                      onChange={handleChangeDate}
                      value={calendarValue}
                      locale="es-MX"
                      tileClassName={({ date, view }) => {
                        if (markDate.find(x => x === moment(date).format('DD-MM-YYYY'))) {
                          return 'highlight'
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={'p-10 ' + styles.container}>
              <div className={'flex justify-between'}>
                <div className={styles.highBoldLabel}>NO TIENES PLANES ACTIVOS</div>
                <NotificationButton />
              </div>
              <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 250px)' }}>
                <div className="text-center">
                  <Image src={plansIcon} alt={''} width={200} height={200} />
                  <div className={'my-10 ' + styles.linkTitle}> Pero puedes contratarlo siguiendo este enlace</div>
                  <div
                    className={'flex justify-center cursor-pointer ' + styles.linkButton}
                    onClick={() => {
                      router.push('/services/nutrition')
                    }}
                  >
                    Comprar bono
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Nutrition">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
