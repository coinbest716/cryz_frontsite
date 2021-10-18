import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './nutrition.module.scss'
import Image from 'next/image'

const Nutrition = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Nutrition</div>
        </div>
      </div>
    </div>
  )
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
