import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './shopping.module.scss'
import Image from 'next/image'

const Shopping = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Shopping</div>
        </div>
      </div>
    </div>
  )
}
export default Shopping

Shopping.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
