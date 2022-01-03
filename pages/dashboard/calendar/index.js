import React, { createRef, useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import dynamic from 'next/dynamic'
import router from 'next/router'

// third party components
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ClassItem from 'components/components/dashboard/calendar/ClassItem'
// import Profile from 'components/components/dashboard/Profile'
import CheckBoxImage from 'components/components/dashboard/CheckBoxImage'

// styles
import styles from './calendar.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Calendar = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const { viewport } = props

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
  //variables
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })
  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const [getLocationByDashboard, { data: roomData, loading: roomLoading, error: roomError }] = useLazyQuery(
    graphql.queries.getLocationByDashboard
  )
  const calendarComponentRef = createRef()
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])
  const [roomList, setRoomList] = useState([])

  useEffect(() => {
    getSessionsByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })
    getLocationByDashboard()
    const eventDate = router.query.eventDate
    if (eventDate) {
      let calendarApi = calendarComponentRef.current.getApi()
      calendarApi.gotoDate(eventDate) // call a method on the Calendar object
    }
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
    if (!roomError && roomData && roomData.getLocationByDashboard) {
      const roomArr = roomData.getLocationByDashboard
      const _roomList = []
      roomArr.map(item => {
        const _roomItem = {
          id: item.id,
          name: item.name,
          color: item.color,
        }
        _roomList.push(_roomItem)
      })
      setRoomList(_roomList)
    }
  }, [roomLoading, roomData, roomError])

  const handleClickStartClass = () => {
    router.push({
      pathname: '/dashboard/live-streaming',
      query: { id: streamingEvent.id },
    })
  }
  const handleChangeDate = value => {
    setCalendarValue(value)
    const styleDate = moment(value).format('YYYY-MM-DD')
    markDate.map(item => {
      if (item === moment(value).format('DD-MM-YYYY')) {
        let calendarApi = calendarComponentRef.current.getApi()
        calendarApi.gotoDate(styleDate) // call a method on the Calendar object
      }
    })
  }
  return (
    <>
      {viewport === 'mobile' ? (
        <div className={'p-2 ' + styles.mobileContainer}>
          <div className="pt-10">
            <DashboardButton
              handleClick={handleClickStartClass}
              label={'Comenzar clase'}
              type={'startClass'}
              visible={true}
            />
          </div>
          <div className={'calendarWrapper mt-5 bg-white rounded-xl '}>
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
          <div>
            <div className={styles.nextClass + ' pt-8'}>Siguiente clase</div>
            {events.map((event, index) => (
              <ClassItem event={event} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className={'px-10 py-10 ' + styles.container}>
          <div className={'grid grid-cols-12 gap-12'}>
            <div className={'col-span-12 md:col-span-8 sm:col-span-12 flex justify-between'}>
              <div className={styles.highBoldLabel}>Calendario</div>
              <DashboardButton
                handleClick={handleClickStartClass}
                label={'Comenzar clase'}
                type={'startClass'}
                visible={streamingEvent.toggle}
              />
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12 flex justify-between items-center'}>
              <NotificationButton />
              {/* <Profile /> */}
            </div>
          </div>
          <div className={'grid grid-cols-12 gap-12 pt-8'}>
            <div className={'col-span-12 md:col-span-8 sm:col-span-12 w-full'}>
              <div className={'fullCalendarWrapper'}>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]} //[dayGridPlugin, timeGridPlugin, interactionPlugin]
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                  }}
                  initialView="timeGridWeek"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  events={events}
                  locale={esLocale}
                  ref={calendarComponentRef}
                  allDaySlot={false}
                />
              </div>
            </div>
            <div className={'col-span-12 md:col-span-4 sm:col-span-12'}>
              <div className={'calendarWrapper'}>
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
              <div className={'mt-8 px-5 py-4 ' + styles.roomContainer}>
                <div className={'pb-3 ' + styles.roomTitle}>Crys&Co Room</div>
                {roomList.map((item, index) => (
                  <div className={'py-3'} key={index}>
                    <CheckBoxImage label={item.name} color={item.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Calendar

Calendar.getLayout = function getLayout(page) {
  return page.props.viewport === 'mobile' ? (
    <MobileDashboardLayout title="Calendario">{page}</MobileDashboardLayout>
  ) : (
    <SecondaryLayout>{page}</SecondaryLayout>
  )
}
