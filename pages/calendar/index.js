import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './calendar.module.scss'

const Calendar = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">Calendar</div>
    </div>
  )
}
export default Calendar

Calendar.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
