import SecondaryLayout from 'components/Layout/SecondaryLayout'
import globlaStyle from 'styles/GlobalStyle.module.scss'
import styles from './home.module.scss'
import Image from 'next/image'

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className={styles.container}>
        <div className={globlaStyle.container + ' pt-20'}>
          <div className="h-full">Home</div>
        </div>
      </div>
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
