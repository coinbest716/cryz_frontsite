import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Common.module.scss'

const Training = () => {
  return <div className={styles.container}>Training page content</div>
}
export default Training

Training.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
