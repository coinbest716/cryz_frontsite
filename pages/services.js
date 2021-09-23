import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const Services = () => {
  return <div className={styles.container}>Services page content</div>
}
export default Services

Services.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
