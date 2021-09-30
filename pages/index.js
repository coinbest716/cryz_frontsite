import PrimaryLayout from 'components/Layout/PrimaryLayout'

// components
import MainSection from 'components/Home/MainSection'
import COSection from 'components/Home/COSection'
import styles from 'styles/Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <MainSection />
      <COSection />
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
