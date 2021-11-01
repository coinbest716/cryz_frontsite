import React, { useEffect, useState } from 'react'
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './calendar.module.scss'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import DashboardButton from 'components/components/dashboard/DashboardButton'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import ProfileInfo from 'components/components/dashboard/Profile'
import dynamic from 'next/dynamic'
const MonthCalendar = dynamic(() => import('react-calendar'), { ssr: false })
import 'react-calendar/dist/Calendar.css'
import CheckBoxImage from 'components/components/dashboard/CheckBoxImage'
import CalendarData from 'assets/data/CalendarData'

const Calendar = () => {
  const [value, onChange] = useState(new Date())
  const mark = ['28-10-2021', '29-10-2021', '30-10-2021']
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents(CalendarData)
  }, [])

  const handleClickStartClass = () => {
    router.push('/dashboard/live-streaming')
  }

  return (
    <div className={'px-10 py-10 ' + styles.container}>
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-8 sm:col-span-12 flex justify-between">
          <div className={styles.highBoldLabel}>Calendario</div>
          <DashboardButton handleClick={handleClickStartClass} label={'Comenzar clase'} type={'startClass'} />
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12 flex justify-between items-center">
          <div className="pr-4">
            <NotificationButton />
          </div>
          <ProfileInfo />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-12 pt-8">
        <div className="col-span-12 md:col-span-8 sm:col-span-12 w-full">
          <div className="fullCalendarWrapper">
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
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12">
          <div className="calendarWrapper">
            <MonthCalendar className={styles.calendar} onChange={onChange} value={value} />
          </div>
          <div className={'mt-8 px-5 py-4 ' + styles.roomContainer}>
            <div className={'pb-3 ' + styles.roomTitle}>Crys&Co Room</div>
            {events.map((item, index) => (
              <div className="py-3" key={index}>
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
