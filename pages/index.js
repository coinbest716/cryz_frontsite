import PrimaryLayout from 'components/Layout/PrimaryLayout'
import COSlider from 'components/Home/COSlider'
import styles from 'styles/Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      Home page content
      <div style={{ height: '200px' }}></div>
      <COSlider />
    </div>
  )
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
