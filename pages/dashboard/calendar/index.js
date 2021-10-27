import React, { useState } from 'react'
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
import moment from 'moment'
import CheckBoxImage from 'components/components/dashboard/CheckBoxImage'

const Calendar = () => {
  const [value, onChange] = useState(new Date())
  const mark = ['28-10-2021', '29-10-2021', '30-10-2021']

  const events = [
    {
      id: 1,
      title: 'Redesign Landing Page Website',
      start: '2021-10-27T10:30:00',
      end: '2021-10-27T12:30:00',
      backgroundColor: '#585AB9',
      textColor: '#ffffff',
      label: 'Gimnasio 1',
    },
    {
      id: 2,
      title: 'Redesign Landing Page Website',
      start: '2021-10-28T08:30:00',
      end: '2021-10-28T11:00:00',
      backgroundColor: '#FF9F24',
      textColor: '#ffffff',
      label: 'Sala 5',
    },
    {
      id: 3,
      title: 'Redesign Landing Page Website',
      start: '2021-10-29T13:30:00',
      end: '2021-10-29T17:00:00',
      backgroundColor: '#3FB100',
      textColor: '#ffffff',
      label: 'Directo',
    },
  ]

  const handleClickStartClass = () => {
    console.log('handleClickStartClass redirect live video section wc-64')
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
          <div>
            <FullCalendar
              className={styles.fullCalendarSection}
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
            <MonthCalendar
              className={styles.calendar}
              onChange={onChange}
              value={value}
              // tileClassName={({ date, view }) => {
              //   if (mark.find(x => x === moment(date).format('DD-MM-YYYY'))) {
              //     return 'highlight'
              //   }
              // }}
              // tileDisabled={({ date }) => date.getDay() === 0}
              /*maxDate={new Date(2020, 1, 0)}</div>*/
              // minDate={new Date()}
            />
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
