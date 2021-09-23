import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const Home = () => {
  return <div className={styles.container}>Home page content</div>
}
export default Home

Home.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
