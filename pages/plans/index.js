import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './plans.module.scss'
import Image from 'next/image'

const Plans = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Plans</div>
        </div>
      </div>
    </div>
  )
}
export default Plans

Plans.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
