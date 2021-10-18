import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './dashboard.module.scss'
import Image from 'next/image'

const Dashboard = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Dashboard</div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

Dashboard.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
