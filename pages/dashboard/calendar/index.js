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
import DashboardButton from 'components/components/dashboard/DashboardButton'
import NotificationButton from 'components/components/dashboard/NotificationButton'
// import Profile from 'components/components/dashboard/Profile'
import CheckBoxImage from 'components/components/dashboard/CheckBoxImage'

// styles
import styles from './calendar.module.scss'

import { useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'

const Calendar = () => {
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
  //variables
  const [streamingEvent, setStreamingEvent] = useState({ id: -1, start: '', toggle: false })
  const [getSessionsByDashboard, { data: sessionData, loading: sessionLoading, error: sessionError }] = useLazyQuery(
    graphql.queries.getSessionsByDashboard
  )
  const calendarComponentRef = createRef()
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    getSessionsByDashboard({ variables: { patient_id: Number(localStorage.getItem('patient_id')) } })

    const eventDate = router.query.eventDate
    if (eventDate) {
      let calendarApi = calendarComponentRef.current.getApi()
      calendarApi.gotoDate(eventDate) // call a method on the Calendar object
    }
    let classInterval = setInterval(() => {
      const currentTime = moment(new Date())
      events.map(item => {
        const eventTime = moment(item.start)
        console.log('@@@@@@@@@@@@@@@ 2 : ', currentTime.diff(eventTime, 'minutes'))
        if (currentTime.diff(eventTime, 'minutes') <= 5) {
          setStreamingEvent({ id: item.id, start: item.start, toggle: item.streaming })
        }
      })
    }, 60000)
    return () => {
      clearInterval(classInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!sessionError && sessionData && sessionData.getSessionsByDashboard) {
      const sessionArr = sessionData.getSessionsByDashboard
      const _events = []
      const _markDate = []
      sessionArr.map(item => {
        const _eventItem = {
          id: item.id,
          title: item.purchase.item_name,
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

  const handleClickStartClass = () => {
    router.push('/dashboard/live-streaming')
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
    <div className={'px-10 py-10 ' + styles.container}>
      <div className={'grid grid-cols-12 gap-12'}>
        <div className={'col-span-12 md:col-span-8 sm:col-span-12 flex justify-between'}>
          <div className={styles.highBoldLabel}>Calendario</div>
          <DashboardButton
            handleClick={handleClickStartClass}
            label={'Comenzar clase'}
            type={'startClass'}
            visiable={streamingEvent.toggle}
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
            {events.map((item, index) => (
              <div className={'py-3'} key={index}>
                <CheckBoxImage label={item.label} color={item.backgroundColor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Calendar

Calendar.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
