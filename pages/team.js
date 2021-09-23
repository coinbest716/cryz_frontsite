import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const Team = () => {
  return <div className={styles.container}>Team page content</div>
}
export default Team

Team.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
