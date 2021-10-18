import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './billing.module.scss'
import Image from 'next/image'

const Billing = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Billing</div>
        </div>
      </div>
    </div>
  )
}
export default Billing

Billing.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
