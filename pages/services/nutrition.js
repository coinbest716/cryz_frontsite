import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Common.module.scss'

const Nutrition = () => {
  return <div className={styles.container}>Nutrition page content</div>
}
export default Nutrition

Nutrition.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
