import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">Dashboard</div>
    </div>
  )
}
export default Dashboard

Dashboard.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
