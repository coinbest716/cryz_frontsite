import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './plans.module.scss'

const Plans = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">Plans</div>
    </div>
  )
}
export default Plans

Plans.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
