import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Common.module.scss'

const Physiotherapy = () => {
  return <div className={styles.container}>Physiotherapy page content</div>
}
export default Physiotherapy

Physiotherapy.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
