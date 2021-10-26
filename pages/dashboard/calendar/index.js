import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './calendar.module.scss'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          // initialEvents={classData} // alternatively, use the `events` setting to fetch from a feed
          // events={classData}
        />
      </div>
    </div>
  )
}
export default Calendar

Calendar.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
