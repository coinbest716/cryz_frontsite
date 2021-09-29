import PrimaryLayout from 'components/Layout/PrimaryLayout'

// components
import MainSection from 'components/Home/MainSection'
import COSlider from 'components/Home/COSlider'
import styles from 'styles/Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <MainSection />
      <COSlider />
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
