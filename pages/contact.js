import ContactLayout from 'components/Layout/ContactLayout'
import styles from 'styles/Common.module.scss'

const Contact = () => {
  return <div className={styles.container}>Contact page content</div>
}
export default Contact

Contact.getLayout = function getLayout(page) {
  return <ContactLayout>{page}</ContactLayout>
}
