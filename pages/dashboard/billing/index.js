import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './billing.module.scss'

const Billing = () => {
  return (
    <div className={'flex flex-wrap ' + styles.container}>
      <div className="h-full text-3xl">Billing</div>
    </div>
  )
}
export default Billing

Billing.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
