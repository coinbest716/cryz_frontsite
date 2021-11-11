import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// next components
import dynamic from 'next/dynamic'

// third party components
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import CheckBoxImage from 'components/components/dashboard/CheckBoxImage'

// styles
import styles from './calendar.module.scss'

// json data
import CalendarData from 'assets/data/CalendarData'

const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })

const Calendar = () => {
  // loading part
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted])

  const calendarComponentRef = React.createRef()
  const [calendarValue, setCalendarValue] = useState(new Date())
  const [markDate, setMarkDate] = useState([])
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents(CalendarData)
    const _markDate = []
    CalendarData.map(item => {
      _markDate.push(moment(item.start).format('DD-MM-YYYY'))
    })
    setMarkDate(_markDate)
  }, [])

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
          <DashboardButton handleClick={handleClickStartClass} label={'Comenzar clase'} type={'startClass'} />
        </div>
        <div className={'col-span-12 md:col-span-4 sm:col-span-12 flex justify-between items-center'}>
          <div className={'pr-4'}>
            <NotificationButton />
          </div>
          <ProfileInfo />
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
