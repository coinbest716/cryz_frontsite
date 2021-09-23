import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const Classland = () => {
  return <div className={styles.container}>Classland page content</div>
}
export default Classland

Classland.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
