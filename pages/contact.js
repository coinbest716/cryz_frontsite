import PrimaryLayout from 'components/Layout/PrimaryLayout'
import styles from 'styles/Home.module.scss'

const Contact = () => {
  return <div className={styles.container}>Contact page content</div>
}
export default Contact

Contact.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
