import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const FemaleHealth = () => {
  return <div className={styles.container}>FemaleHealth page content</div>
}
export default FemaleHealth

FemaleHealth.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
